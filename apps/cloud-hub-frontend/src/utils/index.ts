import { formatSI } from 'format-si-prefix';
import parseUnit from 'parse-unit';

export function formatNumber(size: number, unit: string) {
  const [value, unitPrefix] = parseUnit(formatSI(size));
  return `${value} ${unitPrefix}${unit}`;
}
