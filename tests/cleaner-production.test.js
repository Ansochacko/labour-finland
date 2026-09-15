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

const cleaner = engine.findOccupation(dataset.occupations, "siivooja");
assert(cleaner && cleaner.id === "cleaner", "Cleaner alias should resolve.");

const today = "2026-09-15";
const asked = engine.resolveWage(dataset, cleaner, {}, today);
assert(asked.status === "NEEDS_QUESTION", "Cleaner should ask for a grade.");

function amountFor(answers) {
  const result = engine.resolveWage(dataset, cleaner, answers, today);
  assert(result.status === "RESOLVED", `Expected a resolved wage for ${JSON.stringify(answers)}`);
  return result.record;
}

const grade2 = amountFor({ pay_group: "grade-2" });
assert(grade2.wage.amount === 12.59, "Grade 2 hourly");
assert(grade2.wage.monthly_amount === 2027, "Grade 2 monthly");

const grade3 = amountFor({ pay_group: "grade-3" });
assert(grade3.wage.amount === 13.22, "Grade 3 hourly");
assert(grade3.wage.monthly_amount === 2128, "Grade 3 monthly");

const grade10 = amountFor({ pay_group: "grade-10" });
assert(grade10.wage.amount === 17.90, "Grade 10 hourly");
assert(grade10.wage.monthly_amount === 2882, "Grade 10 monthly");

const grade9 = amountFor({ pay_group: "grade-9" });
assert(grade9.wage.amount === 17.22, "Points 52–58 / Grade 9 hourly");
assert(grade9.classification.points === "52–58", "Grade 9 points");

const trainee = amountFor({ pay_group: "trainee" });
assert(trainee.wage.amount === 11.33, "Trainee hourly");
assert(trainee.wage.monthly_amount === 1824, "Trainee monthly");

const table = engine.resolveWage(dataset, cleaner, { pay_group: "__table__" }, today);
assert(table.status === "SHOW_TABLE", "Unsure should show the table, not a guessed wage.");
assert(!table.record, "Unsure must not resolve a single wage.");

const future = engine.resolveWage(dataset, cleaner, { pay_group: "grade-3" }, "2026-07-31");
assert(future.status !== "RESOLVED" || future.record.wage.amount !== 13.22, "Future table must not apply before 1 August 2026.");

const nextTable = engine.resolveWage(dataset, cleaner, { pay_group: "grade-3" }, "2027-07-01");
assert(nextTable.status === "RESOLVED" && nextTable.record.wage.amount === 13.54, "2027 table should apply on its effective date.");

const restaurant = engine.findOccupation(dataset.occupations, "restaurant worker");
const restaurantAsked = engine.resolveWage(dataset, restaurant, {}, today);
assert(restaurantAsked.status === "NEEDS_QUESTION", "Restaurant worker should ask for a pay group.");

const fixtures = require("fs").existsSync(path.join(__dirname, "wage-engine.test.js"));
assert(fixtures, "Isolated fixture tests must remain separate from production data.");

console.log("Cleaner production tests passed.");
