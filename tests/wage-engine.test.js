"use strict";

const path = require("path");
const engine = require(path.join("..", "js", "wage-engine.js"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const fixtures = engine.prepareDataset({
  occupations: [
    {
      id: "dev-occupation",
      name: "Development test occupation",
      aliases: ["dev job", "fixture worker"],
      status: "ACTIVE",
      question_flow: ["dev-job-type"],
    },
  ],
  agreements: [
    {
      id: "dev-agreement",
      name: "Development-only agreement",
      verification_status: "UNVERIFIED",
    },
  ],
  questions: [
    {
      id: "dev-job-type",
      type: "single_choice",
      answer_key: "job_type",
      prompt: "What kind of work do you mainly do?",
      why: "This question exists only in isolated development tests.",
      verification_status: "VERIFIED",
      options: [
        { value: "type-a", label: "Type A" },
        { value: "type-b", label: "Type B" },
      ],
    },
  ],
  wageRecords: [
    {
      id: "dev-current",
      occupation_id: "dev-occupation",
      agreement_id: "dev-agreement",
      classification: { job_type: "type-a" },
      wage: { amount: 99999.99, unit: "EUR_HOUR", type: "TES_MINIMUM" },
      effective_from: "2000-01-01",
      effective_until: "2999-12-31",
      source_name: "Development fixture",
      source_url: "https://example.invalid/labour-finland-dev-fixture",
      last_verified: "2000-01-01",
      verification_status: "VERIFIED",
    },
    {
      id: "dev-current-b",
      occupation_id: "dev-occupation",
      agreement_id: "dev-agreement",
      classification: { job_type: "type-b" },
      wage: { amount: 88888.88, unit: "EUR_HOUR", type: "TES_MINIMUM" },
      effective_from: "2000-01-01",
      effective_until: "2999-12-31",
      source_name: "Development fixture",
      source_url: "https://example.invalid/labour-finland-dev-fixture",
      last_verified: "2000-01-01",
      verification_status: "VERIFIED",
    },
    {
      id: "dev-expired",
      occupation_id: "dev-occupation",
      agreement_id: "dev-agreement",
      classification: { job_type: "type-a" },
      wage: { amount: 11111.11, unit: "EUR_HOUR", type: "TES_MINIMUM" },
      effective_from: "2000-01-01",
      effective_until: "2000-12-31",
      source_name: "Development fixture",
      source_url: "https://example.invalid/labour-finland-dev-fixture",
      last_verified: "2000-01-01",
      verification_status: "VERIFIED",
    },
    {
      id: "dev-future",
      occupation_id: "dev-occupation",
      agreement_id: "dev-agreement",
      classification: { job_type: "type-a" },
      wage: { amount: 77777.77, unit: "EUR_HOUR", type: "TES_MINIMUM" },
      effective_from: "2999-01-01",
      effective_until: null,
      source_name: "Development fixture",
      source_url: "https://example.invalid/labour-finland-dev-fixture",
      last_verified: "2000-01-01",
      verification_status: "VERIFIED",
    },
    {
      id: "dev-unverified",
      occupation_id: "dev-occupation",
      wage: { amount: 12345.67, unit: "EUR_HOUR", type: "TES_MINIMUM" },
      effective_from: "2000-01-01",
      source_url: null,
      last_verified: null,
      verification_status: "UNVERIFIED",
    },
    {
      id: "dev-broken-verified",
      occupation_id: "dev-occupation",
      wage: { amount: 55555.55, unit: "EUR_HOUR", type: "TES_MINIMUM" },
      effective_from: "2000-01-01",
      source_name: null,
      source_url: "not-a-url",
      last_verified: "2000-01-01",
      verification_status: "VERIFIED",
    },
  ],
  supplements: [],
});

const occupation = engine.findOccupation(fixtures.occupations, "DEV JOB");
assert(occupation && occupation.id === "dev-occupation", "Alias search should resolve the development occupation.");
assert(engine.searchOccupations(fixtures.occupations, "fix").length === 1, "Partial typing should return the occupation.");

const first = engine.resolveWage(fixtures, occupation, {}, "2026-09-15");
assert(first.status === "NEEDS_QUESTION", "Multiple current records should ask a question.");
assert(first.question.id === "dev-job-type", "The job-type question should be asked first.");

const resolved = engine.resolveWage(fixtures, occupation, { job_type: "type-a" }, "2026-09-15");
assert(resolved.status === "RESOLVED", "Answering the question should resolve one record.");
assert(resolved.record.id === "dev-current", "The current dated record should be selected.");

const expired = engine.isCurrent(fixtures.wageRecords.find((record) => record.id === "dev-expired"), "2026-09-15");
assert(!expired, "Expired records must not be current.");
const future = engine.isCurrent(fixtures.wageRecords.find((record) => record.id === "dev-future"), "2026-09-15");
assert(!future, "Future records must not be current.");

const eligible = engine.eligibleWageRecords(fixtures, "dev-occupation", "2026-09-15").map((record) => record.id);
assert(!eligible.includes("dev-expired"), "Expired records must not be eligible.");
assert(!eligible.includes("dev-future"), "Future records must not be eligible.");
assert(!eligible.includes("dev-unverified"), "UNVERIFIED records must not be eligible.");
assert(!eligible.includes("dev-broken-verified"), "Invalid VERIFIED records must not be eligible.");
assert(fixtures.validation.warnings.some((warning) => warning.includes("dev-broken-verified")), "Broken VERIFIED records should warn.");

const unknown = engine.findOccupation(fixtures.occupations, "unknown occupation");
assert(!unknown, "Unknown occupations should not resolve.");

const secondOccupation = {
  id: "dev-occupation-b",
  name: "Development test occupation B",
  aliases: ["fixture assistant"],
  status: "ACTIVE",
  question_flow: [],
};
const ambiguousSet = fixtures.occupations.concat(secondOccupation);
const ambiguous = engine.findOccupations(ambiguousSet, "fixture");
assert(ambiguous.length === 2, "A shared partial term should return both occupations for disambiguation.");

console.log("Wage engine development tests passed.");
