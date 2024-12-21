import { getRangeValue } from './get-range-value';

describe('getRangeValue helper', () => {
  it('should return the value itself if range is not provided', () => {
    const value = 50;
    const result = getRangeValue(value);
    expect(result).toBe(value);
  });

  it('should return the closest value in the range', () => {
    const value = 45;
    const range = [0, 25, 50, 75, 100];
    const result = getRangeValue(value, range);
    expect(result).toBe(50);
  });
});
