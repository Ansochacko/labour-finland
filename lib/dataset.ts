import occupationsFile from "@/data/occupations.json";
import agreementsFile from "@/data/collective-agreements.json";
import questionsFile from "@/data/wage-questions.json";
import recordsFile from "@/data/wage-records.json";
import supplementsFile from "@/data/supplements.json";
import statfinFile from "@/data/statfin-records.json";
import engine from "@/lib/wage-engine.js";

export type Occupation = {
  id: string;
  name: string;
  slug: string;
  aliases?: string[];
  sector: string;
  directory_group?: string;
  status: string;
  popular?: boolean;
  requires_classification?: boolean;
  question_flow?: string[];
  preparing?: {
    title?: string;
    body?: string;
    source_name?: string;
    source_url?: string;
  };
};

export type StatfinRecord = {
  id: string;
  occupation_id: string;
  occupation_ids?: string[];
  isco_code: string;
  statfin_occupation: string;
  employee_count: number;
  average_monthly_eur: number;
  median_monthly_eur: number;
};

export function pageSlug(occupation: { slug: string }) {
  return `${occupation.slug}-salary-finland`;
}

export function occupationFromPageSlug(slug: string) {
  const occupations = occupationsFile.occupations as Occupation[];
  return occupations.find((occupation) => pageSlug(occupation) === slug) || null;
}

export function getDataset() {
  return engine.prepareDataset({
    occupations: occupationsFile.occupations,
    agreements: agreementsFile.collective_agreements,
    questions: questionsFile.questions,
    wageRecords: recordsFile.wage_records,
    supplements: supplementsFile.supplements,
  });
}

export function activeOccupations(): Occupation[] {
  return (occupationsFile.occupations as Occupation[]).filter((item) => item.status === "ACTIVE");
}

export function statfinFor(occupationId: string): StatfinRecord | null {
  return (
    (statfinFile.records as StatfinRecord[]).find((record) => {
      const ids = [record.occupation_id, ...(record.occupation_ids || [])];
      return ids.includes(occupationId);
    }) || null
  );
}

export const statfinMeta = {
  license: statfinFile.license,
  attribution: statfinFile.attribution,
  source_name: statfinFile.source_name,
  source_url: statfinFile.source_url,
  documentation_url: statfinFile.documentation_url,
  last_verified: statfinFile.last_verified,
  statistic_year: statfinFile.statistic_year,
};

export { engine, occupationsFile, agreementsFile };
