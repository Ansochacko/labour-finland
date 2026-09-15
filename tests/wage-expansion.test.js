"use strict";

const path = require("path");
const fs = require("fs");
const engine = require(path.join("..", "js", "wage-engine.js"));

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", name), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const dataset = engine.prepareDataset({
  occupations: readJson("occupations.json").occupations,
  agreements: readJson("collective-agreements.json").collective_agreements,
  questions: readJson("wage-questions.json").questions,
  wageRecords: readJson("wage-records.json").wage_records,
  supplements: readJson("supplements.json").supplements,
});

assert(!dataset.validation.warnings.length, dataset.validation.warnings.join(" | "));

const today = "2026-09-15";
const cleaner = engine.findOccupation(dataset.occupations, "cleaner");
const cleanerGrade3 = engine.resolveWage(dataset, cleaner, { pay_group: "grade-3" }, today);
assert(cleanerGrade3.status === "RESOLVED" && cleanerGrade3.record.wage.amount === 13.22, "Cleaner Grade 3 must stay €13.22");
assert(cleanerGrade3.record.wage.monthly_amount === 2128, "Cleaner Grade 3 monthly must stay €2,128");

const restaurant = engine.findOccupation(dataset.occupations, "restaurant worker");
const waiter = engine.findOccupation(dataset.occupations, "waiter");
assert(restaurant && waiter, "Hospitality occupations should resolve.");

const groupQuestion = engine.resolveWage(dataset, restaurant, {}, today);
assert(groupQuestion.status === "NEEDS_QUESTION" && groupQuestion.question.id === "hospitality-pay-group", "Restaurant should ask pay group.");

const group1 = engine.resolveWage(dataset, restaurant, { pay_group: "1", experience_level: "0-2" }, today);
assert(group1.status === "RESOLVED", "Restaurant pay group 1 0–2 should resolve.");
assert(group1.record.wage.amount === 11.97, "Restaurant group 1 0–2 hourly");
assert(group1.record.wage.monthly_amount === 1903, "Restaurant group 1 0–2 monthly");

const waiterSame = engine.resolveWage(dataset, waiter, { pay_group: "1", experience_level: "0-2" }, today);
assert(waiterSame.status === "RESOLVED" && waiterSame.record.wage.amount === 11.97, "Waiter shares the hospitality table, not a guessed mapping.");

const group5 = engine.resolveWage(dataset, restaurant, { pay_group: "5", experience_level: "over-10" }, today);
assert(group5.status === "RESOLVED", "Restaurant pay group 5 over 10 should resolve.");
assert(group5.record.wage.amount === 15.43, "Restaurant group 5 over 10 hourly");
assert(group5.record.wage.monthly_amount === 2453, "Restaurant group 5 over 10 monthly");

const unsure = engine.resolveWage(dataset, restaurant, { pay_group: "__table__" }, today);
assert(unsure.status === "SHOW_TABLE", "Restaurant unsure must show the table.");
assert(!unsure.record, "Restaurant unsure must not guess a wage.");

const supplements = engine.getApplicableSupplements(dataset, group1.record, today);
assert(supplements.some((item) => item.amount === 1.4), "Hospitality evening supplement");
assert(supplements.some((item) => item.amount === 2.37), "Hospitality night supplement");
assert(!supplements.some((item) => item.occupation_id === "cleaner"), "Hospitality result must not reuse cleaner supplements.");

const retail = engine.findOccupation(dataset.occupations, "retail salesperson");
const pksB = engine.resolveWage(
  dataset,
  retail,
  { region: "pks", pay_group: "B", seniority: "2nd-year" },
  today
);
assert(pksB.status === "RESOLVED", "Retail PKS Group B 2nd year should resolve.");
assert(pksB.record.wage.amount === 13.66, "Retail PKS B 2nd hourly");
assert(pksB.record.wage.monthly_amount === 2185, "Retail PKS B 2nd monthly");

const otherB = engine.resolveWage(
  dataset,
  retail,
  { region: "other-finland", pay_group: "B", seniority: "2nd-year" },
  today
);
assert(otherB.status === "RESOLVED", "Retail Other Finland Group B 2nd year should resolve.");
assert(otherB.record.wage.amount === 13.13, "Retail other B 2nd hourly");
assert(otherB.record.wage.monthly_amount === 2101, "Retail other B 2nd monthly");

const unknownGroup = engine.resolveWage(dataset, retail, { region: "pks", pay_group: "__table__" }, today);
assert(unknownGroup.status === "SHOW_TABLE", "Unknown commerce group must show the table.");
assert(!unknownGroup.record, "Unknown commerce group must not guess a wage.");
assert(unknownGroup.records.every((record) => record.classification.region === "pks"), "Unsure group should keep the selected region.");

const afterReform = engine.resolveWage(
  dataset,
  retail,
  { region: "pks", pay_group: "B", seniority: "2nd-year" },
  "2026-10-01"
);
assert(afterReform.status !== "RESOLVED", "Commerce August table must not apply on 1 October 2026.");

const trainee = engine.resolveWage(
  dataset,
  retail,
  { region: "pks", pay_group: "B", seniority: "trainee" },
  today
);
assert(trainee.status === "RESOLVED", "Explicit trainee selection may use the 85% rule.");
assert(trainee.record.derived_from, "Trainee amount must be labelled as derived.");
assert(trainee.record.wage.amount === 11.61, "Trainee is 85% of €13.66, rounded to cents.");

const nurse = engine.findOccupation(dataset.occupations, "lähihoitaja");
const nurseResult = engine.resolveWage(
  dataset,
  nurse,
  {
    sector: "private-social-services",
    region: "other-finland",
    pay_class: "g24d",
    experience_level: "0y",
  },
  today
);
assert(nurseResult.status === "RESOLVED", "Private social services G24D 0 years should resolve.");
assert(nurseResult.record.wage.amount === 17.25, "G24D 0 years hourly");

const publicNurse = engine.resolveWage(dataset, nurse, { sector: "public-health-social-care" }, today);
assert(publicNurse.status === "NO_RESULT", "Public-sector practical nurse must not use the private table.");

const capitalNurse = engine.resolveWage(
  dataset,
  nurse,
  { sector: "private-social-services", region: "capital-region" },
  today
);
assert(capitalNurse.status === "NO_RESULT", "Capital-region practical nurse must not use the Other Finland table.");

const construction = engine.findOccupation(dataset.occupations, "rakennustyöntekijä");
const constructionFirst = engine.resolveWage(dataset, construction, {}, today);
assert(constructionFirst.status === "NEEDS_QUESTION", "Construction should ask for a sector.");
const constructionSector = engine.resolveWage(dataset, construction, { sector: "building-construction" }, today);
assert(constructionSector.status === "NO_RESULT", "Construction must not invent a numeric wage.");
assert(constructionSector.preparing && constructionSector.preparing.source_url, "Construction preparing state should keep the official source.");

const software = engine.findOccupation(dataset.occupations, "software developer");
const softwareResult = engine.resolveWage(dataset, software, {}, today);
assert(softwareResult.status === "NO_RESULT", "Software developer must not invent a TES minimum.");

const security = engine.findOccupation(dataset.occupations, "vartija");
const securityResult = engine.resolveWage(dataset, security, {}, today);
assert(securityResult.status === "NO_RESULT", "Security guard must not invent a wage.");

const warehouse = engine.findOccupation(dataset.occupations, "warehouse worker");
const warehouseFirst = engine.resolveWage(dataset, warehouse, {}, today);
assert(warehouseFirst.status === "NEEDS_QUESTION", "Warehouse worker should ask for sector.");
const warehouseOther = engine.resolveWage(dataset, warehouse, { sector: "other" }, today);
assert(warehouseOther.status === "NO_RESULT", "Non-commerce warehouse work must not guess a table.");
const warehouseCommerce = engine.resolveWage(
  dataset,
  warehouse,
  { sector: "commerce-logistics", region: "pks", pay_group: "B", seniority: "2nd-year" },
  today
);
assert(warehouseCommerce.status === "RESOLVED" && warehouseCommerce.record.wage.amount === 13.66, "Explicit commerce logistics may use the commerce table.");

console.log("Wage expansion tests passed.");
