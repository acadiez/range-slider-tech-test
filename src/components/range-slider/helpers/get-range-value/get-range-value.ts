export const getRangeValue = (value: number, range?: number[]) => {
  if (!range) return value;
  return range.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev));
};
