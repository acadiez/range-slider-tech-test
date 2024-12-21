import { renderHook, waitFor } from '@testing-library/react';
import { useExercise2View } from './use-exercise2-view';
import { getExercise2 } from '@/services';
import { DEFAULT_RANGE } from './constants';

jest.mock('@/services', () => ({
  getExercise2: jest.fn(),
}));

// Mock console.error
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

const setup = () => {
  const { result } = renderHook(() => useExercise2View());
  return { result };
};

describe('useExercise2View hook', () => {
  it('should initialize with loading true and data null, then should set loading to false and set data', async () => {
    const values = { range: [1, 2, 3, 4, 5] };
    (getExercise2 as jest.Mock).mockResolvedValue(values);

    const { result } = setup();

    expect(result.current.state.loading).toBe(true);
    expect(result.current.state.data).toBeNull();

    await waitFor(() => expect(result.current.state.loading).toBe(false));

    expect(result.current.state.data).toEqual(values);
  });

  it('should throw an error and set default values on invalid data', async () => {
    (getExercise2 as jest.Mock).mockResolvedValue({ runge: null });

    const { result } = setup();

    await waitFor(() => expect(result.current.state.loading).toBe(false));

    expect(result.current.state.data).toEqual({ range: DEFAULT_RANGE });
    expect(console.error).toHaveBeenCalledWith(new Error('Invalid data'));
  });
});
