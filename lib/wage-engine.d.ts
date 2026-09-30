declare const engine: {
  prepareDataset: (raw: Record<string, unknown>) => {
    occupations: unknown[];
    agreements: unknown[];
    questions: unknown[];
    wageRecords: unknown[];
    supplements: unknown[];
    validation: { warnings: string[] };
  };
  eligibleWageRecords: (dataset: unknown, occupationId: string, today?: string) => WageRecord[];
  occupationLookupStatus: (dataset: unknown, occupation: unknown) => string;
  lookupStatusLabel: (status: string) => string;
  getAgreement: (dataset: unknown, agreementId?: string | null) => Agreement | null;
  getApplicableSupplements: (dataset: unknown, wageRecord: WageRecord) => Supplement[];
  formatWage: (wage: { amount: number; unit: string }) => string;
  formatMonthlyAmount: (wage: { monthly_amount?: number | null }) => string | null;
  wageTypeLabel: (type: string) => string;
  wageTypeExplanation: (type: string) => string;
  searchOccupations: (occupations: unknown[], query: string, limit?: number) => unknown[];
  findOccupations: (occupations: unknown[], query: string) => unknown[];
  resolveWage: (dataset: unknown, occupation: unknown, answers?: Record<string, string>) => ResolveResult;
};

export type WageRecord = {
  id: string;
  occupation_id: string;
  occupation_ids?: string[];
  agreement_id?: string;
  classification?: Record<string, string | null>;
  wage: { amount: number; monthly_amount?: number | null; unit: string; type: string };
  effective_from: string;
  effective_until?: string | null;
  source_name: string;
  source_url: string;
  last_verified: string;
  notes?: string;
  conditions?: string;
  verification_status: string;
};

export type Agreement = {
  id: string;
  name: string;
  short_name?: string;
  source_name: string;
  source_url: string;
};

export type Supplement = {
  id: string;
  name: string;
  amount?: number | null;
  unit?: string | null;
  calculation_rule?: string | null;
  conditions?: string;
  source_name: string;
  source_url: string;
  category?: string;
};

export type ResolveResult = {
  status: "RESOLVED" | "SHOW_TABLE" | "NEEDS_QUESTION" | "NO_RESULT";
  record?: WageRecord;
  records?: WageRecord[];
  question?: {
    id: string;
    prompt: string;
    why?: string;
    lead?: string;
    options: { value: string; label: string; action?: string }[];
  };
  preparing?: { title?: string; body?: string; source_name?: string; source_url?: string };
};

export default engine;
