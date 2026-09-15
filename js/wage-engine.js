(function wageEngineModule(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.LabourFinlandWageEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createWageEngine() {
  "use strict";

  const VERIFIED = "VERIFIED";
  const VALID_STATUSES = new Set(["VERIFIED", "REVIEW_REQUIRED", "EXPIRED", "UNVERIFIED"]);
  const VALID_UNITS = new Set(["EUR_HOUR", "EUR_MONTH", "EUR_YEAR"]);
  const VALID_WAGE_TYPES = new Set([
    "TES_MINIMUM",
    "BASE_PAY",
    "AVERAGE",
    "MEDIAN",
    "ACTUAL_OBSERVED",
    "ESTIMATE",
    "OTHER",
    "OTHER_VERIFIED",
  ]);

  function normalize(value) {
    return String(value || "").trim().replace(/\s+/g, " ").toLocaleLowerCase("en");
  }

  function isISODate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  }

  function todayLocalISO(now = new Date()) {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function isCurrent(record, today = todayLocalISO()) {
    if (!isISODate(today) || !isISODate(record.effective_from)) return false;
    if (today < record.effective_from) return false;
    if (record.effective_until == null || record.effective_until === "") return true;
    return isISODate(record.effective_until) && today <= record.effective_until;
  }

  function hasValidSourceURL(value) {
    if (typeof value !== "string") return false;
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }

  function addDuplicateWarnings(items, label, warnings) {
    const seen = new Set();
    items.forEach((item, index) => {
      if (!item || !item.id) {
        warnings.push(`${label}[${index}] is missing a unique ID.`);
        return;
      }
      if (seen.has(item.id)) warnings.push(`${label} ID "${item.id}" is duplicated.`);
      seen.add(item.id);
    });
  }

  function duplicateIds(items) {
    const counts = new Map();
    items.forEach((item) => {
      if (item && item.id) counts.set(item.id, (counts.get(item.id) || 0) + 1);
    });
    return new Set([...counts].filter(([, count]) => count > 1).map(([id]) => id));
  }

  function validateDataset(dataset) {
    const occupations = Array.isArray(dataset.occupations) ? dataset.occupations : [];
    const agreements = Array.isArray(dataset.agreements) ? dataset.agreements : [];
    const questions = Array.isArray(dataset.questions) ? dataset.questions : [];
    const wageRecords = Array.isArray(dataset.wageRecords) ? dataset.wageRecords : [];
    const supplements = Array.isArray(dataset.supplements) ? dataset.supplements : [];
    const warnings = [];

    addDuplicateWarnings(occupations, "Occupation", warnings);
    addDuplicateWarnings(agreements, "Agreement", warnings);
    addDuplicateWarnings(questions, "Question", warnings);
    addDuplicateWarnings(wageRecords, "Wage record", warnings);
    addDuplicateWarnings(supplements, "Supplement", warnings);

    const duplicateOccupationIds = duplicateIds(occupations);
    const duplicateAgreementIds = duplicateIds(agreements);
    const duplicateQuestionIds = duplicateIds(questions);
    const duplicateRecordIds = duplicateIds(wageRecords);
    const duplicateSupplementIds = duplicateIds(supplements);
    const occupationIds = new Set(
      occupations.map((item) => item && item.id).filter((id) => id && !duplicateOccupationIds.has(id))
    );
    const agreementIds = new Set(
      agreements.map((item) => item && item.id).filter((id) => id && !duplicateAgreementIds.has(id))
    );
    const questionIds = new Set(
      questions.map((item) => item && item.id).filter((id) => id && !duplicateQuestionIds.has(id))
    );
    const validRecordIds = new Set();
    const validSupplementIds = new Set();

    occupations.forEach((occupation) => {
      if (!occupation || !occupation.id) return;
      if (!Array.isArray(occupation.aliases)) warnings.push(`Occupation "${occupation.id}" must provide an aliases array.`);
      if (!Array.isArray(occupation.question_flow)) {
        warnings.push(`Occupation "${occupation.id}" must provide a question_flow array.`);
      } else {
        occupation.question_flow.forEach((questionId) => {
          if (!questionIds.has(questionId)) {
            warnings.push(`Occupation "${occupation.id}" references unknown question "${questionId}".`);
          }
        });
      }
    });

    wageRecords.forEach((record, index) => {
      const label = record && record.id ? `Wage record "${record.id}"` : `Wage record[${index}]`;
      const errors = [];
      if (!record || !record.id) errors.push("has no ID");
      if (record && duplicateRecordIds.has(record.id)) errors.push("does not have a unique ID");
      if (!record || !occupationIds.has(record.occupation_id)) errors.push("has an invalid occupation reference");
      if (record && record.agreement_id && !agreementIds.has(record.agreement_id)) {
        errors.push("has an invalid agreement reference");
      }
      if (!record || !record.wage || !VALID_UNITS.has(record.wage.unit)) errors.push("has an invalid wage unit");
      if (!record || !record.wage || !VALID_WAGE_TYPES.has(record.wage.type)) errors.push("has an invalid wage type");
      if (record && record.wage && record.wage.amount != null &&
          (!Number.isFinite(record.wage.amount) || record.wage.amount <= 0)) {
        errors.push("has a non-numeric or non-positive amount");
      }
      if (record && record.effective_from != null && !isISODate(record.effective_from)) {
        errors.push("has an invalid effective_from date");
      }
      if (record && record.effective_until != null && !isISODate(record.effective_until)) {
        errors.push("has an invalid effective_until date");
      }
      if (record && isISODate(record.effective_from) && isISODate(record.effective_until) &&
          record.effective_until < record.effective_from) {
        errors.push("ends before it becomes effective");
      }
      if (record && !VALID_STATUSES.has(record.verification_status)) errors.push("has an invalid verification status");

      if (record && record.verification_status === VERIFIED && record.wage && record.wage.amount != null) {
        if (!isISODate(record.effective_from)) errors.push("is VERIFIED but has no valid effective_from date");
        if (!record.source_name) errors.push("is VERIFIED but has no source name");
        if (!hasValidSourceURL(record.source_url)) errors.push("is VERIFIED but has no valid source URL");
        if (!isISODate(record.last_verified)) errors.push("is VERIFIED but has no valid last_verified date");
      }

      if (errors.length) {
        warnings.push(`${label} ${errors.join("; ")}.`);
      } else if (record && record.id) {
        validRecordIds.add(record.id);
      }
    });

    supplements.forEach((record, index) => {
      const label = record && record.id ? `Supplement "${record.id}"` : `Supplement[${index}]`;
      const errors = [];
      if (!record || !record.id) errors.push("has no ID");
      if (record && duplicateSupplementIds.has(record.id)) errors.push("does not have a unique ID");
      if (!record || !occupationIds.has(record.occupation_id)) errors.push("has an invalid occupation reference");
      if (record && record.agreement_id && !agreementIds.has(record.agreement_id)) {
        errors.push("has an invalid agreement reference");
      }
      if (record && record.amount != null && (!Number.isFinite(record.amount) || record.amount <= 0)) {
        errors.push("has a non-numeric or non-positive amount");
      }
      if (record && record.verification_status === VERIFIED) {
        if (record.amount == null && !record.calculation_rule) errors.push("has no amount or calculation rule");
        if (!isISODate(record.effective_from)) errors.push("has no valid effective_from date");
        if (!record.source_name) errors.push("has no source name");
        if (!hasValidSourceURL(record.source_url)) errors.push("has no valid source URL");
        if (!isISODate(record.last_verified)) errors.push("has no valid last_verified date");
      }
      if (errors.length) warnings.push(`${label} ${errors.join("; ")}.`);
      else if (record && record.id) validSupplementIds.add(record.id);
    });

    return { warnings, validRecordIds, validSupplementIds };
  }

  function searchableTerms(occupation) {
    return [occupation.name, occupation.id, occupation.slug, ...(occupation.aliases || [])]
      .map(normalize)
      .filter(Boolean);
  }

  function matchScore(terms, needle, base) {
    if (terms.some((term) => term === needle)) return base;
    if (terms.some((term) => term.startsWith(needle))) return base + 1;
    if (terms.some((term) => term.includes(needle))) return base + 2;
    return 99;
  }

  function searchOccupations(occupations, query, limit = 6) {
    const needle = normalize(query);
    if (!needle) return [];
    return occupations
      .filter((occupation) => occupation && occupation.status === "ACTIVE")
      .map((occupation) => {
        const nameTerms = [occupation.name, occupation.id, occupation.slug].map(normalize).filter(Boolean);
        const aliasTerms = (occupation.aliases || []).map(normalize).filter(Boolean);
        const score = Math.min(matchScore(nameTerms, needle, 0), matchScore(aliasTerms, needle, 3));
        return { occupation, score };
      })
      .filter((entry) => entry.score < 99)
      .sort((a, b) => a.score - b.score || a.occupation.name.localeCompare(b.occupation.name))
      .slice(0, limit)
      .map((entry) => entry.occupation);
  }

  function findOccupations(occupations, query) {
    const needle = normalize(query);
    if (!needle) return [];
    const exact = occupations.filter(
      (occupation) => occupation.status === "ACTIVE" && searchableTerms(occupation).includes(needle)
    );
    if (exact.length) return exact;
    return searchOccupations(occupations, query, 6);
  }

  function findOccupation(occupations, query) {
    const matches = findOccupations(occupations, query);
    return matches.length === 1 ? matches[0] : null;
  }

  function wageTypeLabel(type) {
    return {
      TES_MINIMUM: "Collective-agreement wage",
      BASE_PAY: "Base pay",
      AVERAGE: "Average salary",
      MEDIAN: "Median salary",
      ACTUAL_OBSERVED: "Actual/observed earnings",
      ESTIMATE: "Estimate",
      OTHER: "Other published wage figure",
      OTHER_VERIFIED: "Other verified wage figure",
    }[type] || "Published wage figure";
  }

  function wageTypeExplanation(type) {
    return {
      TES_MINIMUM: "This is a collective-agreement wage-scale amount for the classified work. It is not an average or median salary, and it is not a universal statutory national minimum wage.",
      BASE_PAY: "This figure is published as base pay for the classified work. It is not an average salary.",
      AVERAGE: "This figure is an average salary. It is not a legally required minimum.",
      MEDIAN: "This figure is a median salary. It is not a legally required minimum.",
      ACTUAL_OBSERVED: "This figure is observed earnings. It is not a legally required minimum.",
      ESTIMATE: "This figure is an estimate. It is not a legally required minimum.",
      OTHER: "This published figure is classified according to its source. It should not be treated as a different wage type than the one shown.",
      OTHER_VERIFIED: "This is a verified wage figure classified according to its source. It is not automatically a minimum, average or median.",
    }[type] || "This published figure should be read according to the wage type shown with it.";
  }

  function formatWage(wage) {
    if (!wage || wage.amount == null) return null;
    const amount = new Intl.NumberFormat("en-FI", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(wage.amount);
    if (wage.unit === "EUR_HOUR") return `${amount} / hour`;
    if (wage.unit === "EUR_MONTH") return `${amount} / month`;
    if (wage.unit === "EUR_YEAR") return `${amount} / year`;
    return amount;
  }

  function formatDate(value) {
    if (!isISODate(value)) return "Not recorded";
    const [year, month, day] = value.split("-").map(Number);
    return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" }).format(
      new Date(Date.UTC(year, month - 1, day))
    );
  }

  function eligibleWageRecords(dataset, occupationId, today = todayLocalISO()) {
    const validation = dataset.validation || validateDataset(dataset);
    return (dataset.wageRecords || []).filter(
      (record) =>
        validation.validRecordIds.has(record.id) &&
        record.occupation_id === occupationId &&
        record.verification_status === VERIFIED &&
        record.wage &&
        Number.isFinite(record.wage.amount) &&
        isCurrent(record, today)
    );
  }

  function matchesAnswers(record, answers) {
    const classification = record.classification || {};
    return Object.entries(answers).every(([key, value]) => normalize(classification[key]) === normalize(value));
  }

  function getNextQuestion(dataset, occupation, answers = {}, today = todayLocalISO()) {
    const candidates = eligibleWageRecords(dataset, occupation.id, today).filter((record) =>
      matchesAnswers(record, answers)
    );
    const questionsById = new Map((dataset.questions || []).map((question) => [question.id, question]));

    for (const questionId of occupation.question_flow || []) {
      const question = questionsById.get(questionId);
      if (!question || question.verification_status !== VERIFIED || answers[question.answer_key] != null) continue;
      const relevantValues = new Set(
        candidates.map((record) => record.classification && record.classification[question.answer_key]).filter(Boolean)
      );
      if (relevantValues.size <= 1) continue;
      const classifiedOptions = (question.options || []).filter((option) => relevantValues.has(option.value));
      const tableOptions = (question.options || []).filter(
        (option) => option.action === "SHOW_TABLE" || option.value === "__table__"
      );
      if (classifiedOptions.length !== relevantValues.size) return null;
      return { ...question, options: classifiedOptions.concat(tableOptions) };
    }
    return null;
  }

  function resolveWage(dataset, occupation, answers = {}, today = todayLocalISO()) {
    const eligible = eligibleWageRecords(dataset, occupation.id, today);
    if (Object.values(answers).includes("__table__")) {
      return { status: "SHOW_TABLE", records: eligible };
    }
    const candidates = eligible.filter((record) => matchesAnswers(record, answers));
    const nextQuestion = getNextQuestion(dataset, occupation, answers, today);
    if (nextQuestion) return { status: "NEEDS_QUESTION", question: nextQuestion, candidates };
    if (candidates.length === 1) return { status: "RESOLVED", record: candidates[0] };
    if (candidates.length > 1) return { status: "SHOW_TABLE", records: candidates };
    return { status: "NO_RESULT" };
  }

  function prepareDataset(raw) {
    const dataset = {
      occupations: Array.isArray(raw.occupations) ? raw.occupations : [],
      agreements: Array.isArray(raw.agreements) ? raw.agreements : [],
      questions: Array.isArray(raw.questions) ? raw.questions : [],
      wageRecords: Array.isArray(raw.wageRecords) ? raw.wageRecords : Array.isArray(raw.wage_records) ? raw.wage_records : [],
      supplements: Array.isArray(raw.supplements) ? raw.supplements : [],
    };
    dataset.validation = validateDataset(dataset);
    return dataset;
  }

  function getAgreement(dataset, agreementId) {
    if (!agreementId) return null;
    return (dataset.agreements || []).find((agreement) => agreement.id === agreementId) || null;
  }

  function getApplicableSupplements(dataset, wageRecord, today = todayLocalISO()) {
    const validation = dataset.validation || validateDataset(dataset);
    return (dataset.supplements || []).filter(
      (supplement) =>
        validation.validSupplementIds.has(supplement.id) &&
        supplement.verification_status === VERIFIED &&
        supplement.occupation_id === wageRecord.occupation_id &&
        (!supplement.agreement_id || supplement.agreement_id === wageRecord.agreement_id) &&
        isCurrent(supplement, today)
    );
  }

  return {
    VERIFIED,
    normalize,
    isISODate,
    todayLocalISO,
    isCurrent,
    validateDataset,
    searchOccupations,
    findOccupations,
    findOccupation,
    wageTypeLabel,
    wageTypeExplanation,
    formatWage,
    formatMonthlyAmount(wage) {
      if (!wage || wage.monthly_amount == null) return null;
      return formatWage({ amount: wage.monthly_amount, unit: "EUR_MONTH" });
    },
    formatDate,
    eligibleWageRecords,
    getNextQuestion,
    resolveWage,
    getAgreement,
    getApplicableSupplements,
    prepareDataset,
  };
});
