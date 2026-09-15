"use strict";

const calculatorForm = document.querySelector("[data-calculator]");
const engine = window.LabourFinlandWageEngine;

function calculateGrossPay(hourlyWage, hoursPerWeek) {
  const weekly = hourlyWage * hoursPerWeek;
  const annual = weekly * 52;
  const monthly = annual / 12;
  return { weekly, monthly, annual };
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-FI", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

async function loadProductionDataset() {
  if (!engine) return null;
  const files = await Promise.all([
    fetch("data/occupations.json").then((response) => response.json()),
    fetch("data/collective-agreements.json").then((response) => response.json()),
    fetch("data/wage-questions.json").then((response) => response.json()),
    fetch("data/wage-records.json").then((response) => response.json()),
    fetch("data/supplements.json").then((response) => response.json()),
  ]);
  return engine.prepareDataset({
    occupations: files[0].occupations,
    agreements: files[1].collective_agreements,
    questions: files[2].questions,
    wageRecords: files[3].wage_records,
    supplements: files[4].supplements,
  });
}

function renderSupplements(container, details, supplements) {
  if (!supplements.length) {
    details.hidden = true;
    return;
  }
  details.hidden = false;
  container.replaceChildren();
  addIntro(container);
  supplements.forEach((supplement) => {
    const item = document.createElement("p");
    const label = document.createElement("strong");
    label.textContent = `${supplement.name}: `;
    item.append(label);
    item.append(
      document.createTextNode(
        supplement.amount != null
          ? `${formatMoney(supplement.amount)}${supplement.unit === "EUR_HOUR" ? " / hour" : supplement.unit ? ` ${supplement.unit}` : ""}`
          : supplement.calculation_rule || supplement.conditions || ""
      )
    );
    if (supplement.conditions && supplement.amount != null) {
      item.append(document.createTextNode(` ${supplement.conditions}`));
    }
    container.append(item);
  });
}

function addIntro(container) {
  const intro = document.createElement("p");
  intro.className = "muted";
  intro.textContent = "Possible supplements. They are not added to the estimate above. Applicability depends on conditions in the agreement.";
  container.append(intro);
}

if (calculatorForm) {
  const wageInput = calculatorForm.querySelector("#hourly-wage");
  const hoursInput = calculatorForm.querySelector("#hours-week");
  const error = document.querySelector("#calculator-error");
  const results = document.querySelector("#calculator-results");
  const context = document.querySelector("[data-wage-context]");
  const shiftDetails = document.querySelector("[data-shift-details]");
  const shiftContent = document.querySelector("[data-shift-content]");
  const resultElements = [
    document.querySelector("#weekly-result"),
    document.querySelector("#monthly-result"),
    document.querySelector("#annual-result"),
  ];

  let verifiedRate = null;
  let verifiedLabel = "";

  const updateContext = () => {
    if (!context) return;
    if (!verifiedRate) {
      context.hidden = true;
      return;
    }
    const current = Number(wageInput.value);
    context.hidden = false;
    if (Number.isFinite(current) && current === verifiedRate) {
      context.textContent = verifiedLabel;
    } else {
      context.textContent = "Calculations now use the hourly rate you entered. This is no longer labelled as verified wage information.";
    }
  };

  const updateCalculator = (announce = false) => {
    const wage = Number(wageInput.value);
    const hours = Number(hoursInput.value);
    error.textContent = "";
    updateContext();

    if (!wageInput.value || !hoursInput.value) {
      resultElements.forEach((element) => { element.textContent = "—"; });
      return;
    }

    if (!Number.isFinite(wage) || !Number.isFinite(hours) || wage <= 0 || hours <= 0 || wage > 10000 || hours > 168) {
      error.textContent = "Enter a wage above €0 and weekly hours between 0 and 168.";
      resultElements.forEach((element) => { element.textContent = "—"; });
      return;
    }

    const values = calculateGrossPay(wage, hours);
    document.querySelector("#weekly-result").textContent = formatMoney(values.weekly);
    document.querySelector("#monthly-result").textContent = formatMoney(values.monthly);
    document.querySelector("#annual-result").textContent = formatMoney(values.annual);
    if (announce) {
      results.setAttribute("tabindex", "-1");
      results.focus();
    }
  };

  calculatorForm.addEventListener("input", () => updateCalculator());
  calculatorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateCalculator(true);
  });

  const params = new URLSearchParams(window.location.search);
  const hourlyWage = params.get("hourly_wage");
  const occupationId = params.get("occupation");
  if (hourlyWage && Number(hourlyWage) > 0 && Number(hourlyWage) <= 10000) wageInput.value = hourlyWage;

  loadProductionDataset().then((dataset) => {
    if (!dataset || !occupationId) return;
    const occupation = engine.findOccupation(dataset.occupations, occupationId);
    if (!occupation) return;
    const records = engine.eligibleWageRecords(dataset, occupation.id);
    const matching = records.find(
      (record) => record.wage.unit === "EUR_HOUR" && String(record.wage.amount) === String(Number(hourlyWage))
    );
    if (matching && context) {
      verifiedRate = matching.wage.amount;
      const agreement = engine.getAgreement(dataset, matching.agreement_id);
      const parts = [
        `Using verified wage information for ${occupation.name}.`,
        agreement ? `Agreement: ${agreement.short_name || agreement.name}.` : "",
        matching.classification && matching.classification.grade ? `Classification: ${matching.classification.grade}.` : "",
        "You can change the hourly rate.",
      ].filter(Boolean);
      verifiedLabel = parts.join(" ");
      if (shiftContent && shiftDetails) {
        renderSupplements(shiftContent, shiftDetails, engine.getApplicableSupplements(dataset, matching));
      }
    }
    updateCalculator();
  }).catch(() => {});

  updateCalculator();
}

window.LabourFinlandCalculator = { calculateGrossPay };
