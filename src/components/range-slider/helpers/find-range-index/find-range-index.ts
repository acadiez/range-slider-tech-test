export const findRangeIndex = (value: number, range: number[], type?: 'increase' | 'decrease') => {
  const rangeIndex = range.findIndex((item) => item === value);

  if (type === 'increase') {
    return rangeIndex === range.length - 1 ? rangeIndex : rangeIndex + 1;
  } else if (type === 'decrease') {
    return rangeIndex === 0 ? 0 : rangeIndex - 1;
  } else {
    return rangeIndex;
  }
};
