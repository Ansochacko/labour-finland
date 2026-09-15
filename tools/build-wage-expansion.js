"use strict";

const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const existing = JSON.parse(fs.readFileSync(path.join(dataDir, "wage-records.json"), "utf8"));
const cleanerRecords = existing.wage_records.filter((record) => record.occupation_id === "cleaner");

const HOSPITALITY_IDS = [
  "restaurant-worker",
  "waiter",
  "waitress",
  "cook",
  "chef",
  "kitchen-worker",
  "hotel-worker",
  "hospitality-worker",
];

const hospitalityNotes =
  "This is the wage-scale amount for the selected pay group and experience stage under the Hotel, Restaurant and Leisure Industry collective agreement. Your actual pay may be higher. A job title does not identify the pay group.";

const hospitalityTable = {
  1: {
    "0-2": [1903, 11.97],
    "over-2": [1953, 12.28],
    "over-5": [2001, 12.58],
    "over-10": [2053, 12.91],
  },
  2: {
    "0-2": [1942, 12.21],
    "over-2": [1989, 12.51],
    "over-5": [2062, 12.97],
    "over-10": [2160, 13.58],
  },
  3: {
    "0-2": [2063, 12.97],
    "over-2": [2124, 13.36],
    "over-5": [2184, 13.74],
    "over-10": [2279, 14.33],
  },
  4: {
    "0-2": [2179, 13.7],
    "over-2": [2239, 14.08],
    "over-5": [2307, 14.51],
    "over-10": [2392, 15.04],
  },
  5: {
    "0-2": [2275, 14.31],
    "over-2": [2326, 14.63],
    "over-5": [2384, 14.99],
    "over-10": [2453, 15.43],
  },
};

const experienceLabels = {
  "0-2": "0–2 years",
  "over-2": "over 2 years",
  "over-5": "over 5 years",
  "over-10": "over 10 years",
};

function tesRecord(partial) {
  return {
    ...partial,
    wage: {
      ...partial.wage,
      unit: partial.wage.unit || "EUR_HOUR",
      type: "TES_MINIMUM",
    },
    last_verified: "2026-09-15",
    verification_status: "VERIFIED",
  };
}

const hospitalityRecords = [];
Object.entries(hospitalityTable).forEach(([group, stages]) => {
  Object.entries(stages).forEach(([stage, [monthly, hourly]]) => {
    hospitalityRecords.push(
      tesRecord({
        id: `hrl-2026-06-g${group}-${stage}`,
        occupation_id: "restaurant-worker",
        occupation_ids: HOSPITALITY_IDS,
        agreement_id: "hotel-restaurant-leisure-2025-2028",
        classification: {
          pay_group: group,
          experience_level: stage,
          grade: `Pay group ${group}`,
          points: null,
          job_type: "employee",
          region: null,
          experience: experienceLabels[stage],
        },
        wage: { amount: hourly, monthly_amount: monthly },
        effective_from: "2026-06-01",
        effective_until: null,
        source_name: "PAM — Service Union United",
        source_url: "https://www.pam.fi/wp-content/uploads/2025/04/marava_palkat_tyontekijat_01062026.pdf",
        notes: hospitalityNotes,
        conditions: `Pay group ${group}, ${experienceLabels[stage]}.`,
      })
    );
  });
});

const commerceNotes =
  "This is the wage-scale amount for the selected region, wage group and seniority stage under the commerce-sector employee table effective 1 August 2026. A job title does not identify the wage group. The commerce-sector pay system changes from 1 October 2026.";

const commerceTable = {
  pks: {
    A: {
      "2nd-year": [2061, 12.88],
      "4th-year": [2135, 13.34],
      "6th-year": [2250, 14.06],
      "9th-year": [2359, 14.74],
    },
    B: {
      "2nd-year": [2185, 13.66],
      "4th-year": [2267, 14.17],
      "6th-year": [2395, 14.97],
      "9th-year": [2502, 15.64],
    },
    C: {
      "2nd-year": [2334, 14.59],
      "4th-year": [2418, 15.11],
      "6th-year": [2580, 16.13],
      "9th-year": [2704, 16.9],
    },
    D: {
      "2nd-year": [2458, 15.36],
      "4th-year": [2550, 15.94],
      "6th-year": [2721, 17.01],
      "9th-year": [2928, 18.3],
    },
  },
  "other-finland": {
    A: {
      "2nd-year": [1979, 12.37],
      "4th-year": [2049, 12.81],
      "6th-year": [2154, 13.46],
      "9th-year": [2252, 14.08],
    },
    B: {
      "2nd-year": [2101, 13.13],
      "4th-year": [2180, 13.63],
      "6th-year": [2290, 14.31],
      "9th-year": [2389, 14.93],
    },
    C: {
      "2nd-year": [2233, 13.96],
      "4th-year": [2314, 14.46],
      "6th-year": [2459, 15.37],
      "9th-year": [2572, 16.08],
    },
    D: {
      "2nd-year": [2354, 14.71],
      "4th-year": [2465, 15.41],
      "6th-year": [2591, 16.19],
      "9th-year": [2775, 17.34],
    },
  },
};

const regionLabels = {
  pks: "Helsinki, Espoo, Kauniainen or Vantaa",
  "other-finland": "Other Finland",
};
const seniorityLabels = {
  "2nd-year": "2nd year",
  "4th-year": "4th year",
  "6th-year": "6th year",
  "9th-year": "9th year",
};

function commerceRecordsFor(occupationId, occupationIds, extraClassification, idPrefix) {
  const records = [];
  Object.entries(commerceTable).forEach(([region, groups]) => {
    Object.entries(groups).forEach(([group, stages]) => {
      Object.entries(stages).forEach(([seniority, [monthly, hourly]]) => {
        records.push(
          tesRecord({
            id: `${idPrefix}-${region}-g${group}-${seniority}`,
            occupation_id: occupationId,
            occupation_ids: occupationIds,
            agreement_id: "commerce-sector",
            classification: {
              ...extraClassification,
              region,
              pay_group: group,
              seniority,
              grade: `Group ${group}`,
              points: null,
              job_type: "employee",
              experience_level: seniority,
            },
            wage: { amount: hourly, monthly_amount: monthly },
            effective_from: "2026-08-01",
            effective_until: "2026-09-30",
            source_name: "PAM — Service Union United",
            source_url: "https://www.pam.fi/wp-content/uploads/2025/03/Kaupan-alan-taulukkopalkat-1.8.2026-30.4.2027-1.pdf",
            notes: commerceNotes,
            conditions: `${regionLabels[region]}, Group ${group}, ${seniorityLabels[seniority]}.`,
            notices: [
              "The commerce-sector pay system changes from 1 October 2026. Labour Finland uses effective dates to distinguish current and future wage information.",
            ],
          })
        );
      });
    });
  });
  return records;
}

const retailRecords = commerceRecordsFor("retail-salesperson", ["retail-salesperson"], {}, "com-2026-08");
const warehouseRecords = commerceRecordsFor(
  "warehouse-worker",
  ["warehouse-worker", "logistics-worker"],
  { sector: "commerce-logistics" },
  "comlog-2026-08"
);

const socialNotes =
  "This is the Other Finland hourly wage-scale amount for the selected private social services pay class and experience stage. It is not used for the capital region or for public-sector practical nurses. A job title does not identify the pay class.";

const socialClasses = [
  ["A", "G16A", "g16a", [13.2, 13.64, 14.07, 14.51]],
  ["B", "G18B", "g18b", [13.98, 14.43, 14.9, 15.4]],
  ["C", "G20C", "g20c", [15.29, 15.75, 16.21, 16.69]],
  ["C", "G21", "g21", [15.38, 16.03, 16.69, 17.37]],
  ["C", "G22", "g22", [15.5, 16.16, 16.84, 17.55]],
  ["D", "G24D", "g24d", [17.25, 17.76, 18.28, 18.84]],
  ["E", "G25E", "g25e", [18.7, 19.26, 19.82, 20.4]],
  ["E", "G26", "g26", [18.7, 19.26, 20.11, 20.99]],
  ["E", "G27", "g27", [18.7, 19.53, 20.41, 21.3]],
  ["F", "G28F", "g28f", [20.82, 21.46, 22.09, 22.72]],
  ["F", "G29", "g29", [20.82, 21.5, 22.48, 23.46]],
  ["F", "G30", "g30", [22.77, 23.86, 24.94, 26.04]],
  ["F", "G31", "g31", [23.94, 25.09, 26.24, 27.39]],
  ["F", "G32", "g32", [25.54, 26.76, 27.99, 29.23]],
];
const socialExperience = [
  ["0y", "0 years"],
  ["5y", "5 years"],
  ["8y", "8 years"],
  ["11y", "11 years"],
];

const socialRecords = [];
socialClasses.forEach(([payGroup, label, payClass, amounts]) => {
  amounts.forEach((hourly, index) => {
    const [experience, experienceLabel] = socialExperience[index];
    socialRecords.push(
      tesRecord({
        id: `sostes-2026-09-${payClass}-${experience}`,
        occupation_id: "practical-nurse",
        occupation_ids: ["practical-nurse"],
        agreement_id: "private-social-services",
        classification: {
          sector: "private-social-services",
          region: "other-finland",
          pay_group: payGroup,
          pay_class: payClass,
          experience_level: experience,
          grade: `${payGroup} / ${label}`,
          points: null,
          job_type: "employee",
        },
        wage: { amount: hourly, monthly_amount: null, unit: "EUR_HOUR" },
        effective_from: "2026-09-01",
        effective_until: null,
        source_name: "Tehy",
        source_url:
          "https://www.tehy.fi/fi/tyoelamaopas/tyoehtosopimukset/sostes-yksityisen-sosiaalipalvelualan-tyoehtosopimus",
        notes: socialNotes,
        conditions: `Other Finland, ${payGroup} / ${label}, ${experienceLabel}.`,
      })
    );
  });
});

const wage_records = cleanerRecords.concat(hospitalityRecords, retailRecords, warehouseRecords, socialRecords);
const payload = {
  schema_version: 1,
  field_notes: {
    occupation_ids: "Optional extra occupation IDs that share the same verified table. Do not use this to guess a classification.",
    notices: "Optional user-facing dated notices. Do not treat a notice as a wage figure.",
  },
  wage_records,
};

fs.writeFileSync(path.join(dataDir, "wage-records.json"), `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${wage_records.length} wage records (${cleanerRecords.length} cleaner preserved).`);
