import { findRangeIndex } from './find-range-index';

describe('findRangeIndex helper', () => {
  it('should return the rangeIndex if not type provided', () => {
    const value = 25;
    const range = [0, 25, 50, 75, 100];
    const result = findRangeIndex(value, range);
    expect(result).toBe(1);
  });

  it('should return the rangeIndex +1 if type is increase', () => {
    const value = 25;
    const range = [0, 25, 50, 75, 100];
    const result = findRangeIndex(value, range, 'increase');
    expect(result).toBe(2);
  });

  it('should return the rangeIndex -1 if type is decrease', () => {
    const value = 25;
    const range = [0, 25, 50, 75, 100];
    const result = findRangeIndex(value, range, 'decrease');
    expect(result).toBe(0);
  });

  it('should return 0 if type is decrease and rangeIndex is already 0', () => {
    const value = 0;
    const range = [0, 25, 50, 75, 100];
    const result = findRangeIndex(value, range, 'decrease');
    expect(result).toBe(0);
  });

  it('should return max index if type is increase and rangeIndex is already max', () => {
    const value = 100;
    const range = [0, 25, 50, 75, 100];
    const result = findRangeIndex(value, range, 'increase');
    expect(result).toBe(4);
  });
});
