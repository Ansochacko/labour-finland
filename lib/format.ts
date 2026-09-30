import type { WageRecord } from "@/lib/wage-engine";

export function formatEuro(amount: number) {
  return new Intl.NumberFormat("en-FI", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function classificationLabel(classification?: Record<string, string | null> | null) {
  if (!classification) return "Classification not stated";
  const parts = [];
  if (classification.grade && classification.points) parts.push(`${classification.grade} · ${classification.points} points`);
  else if (classification.grade) parts.push(classification.grade);
  else if (classification.pay_group) parts.push(`Pay group ${classification.pay_group}`);
  if (classification.experience_level) parts.push(classification.experience_level);
  if (classification.region) parts.push(classification.region);
  return parts.join(" · ") || "Classification not stated";
}

export function recordAppliesTo(record: WageRecord, occupationId: string) {
  const ids = [record.occupation_id, ...(record.occupation_ids || [])];
  return ids.includes(occupationId);
}
