import { MONTHS } from "@/shared/constants/months";

export function getMostActiveMonth(monthly: number[]): string {
  const max = Math.max(...monthly);
  const index = monthly.indexOf(max);
  return index >= 0 ? MONTHS[index] : "-";
}
