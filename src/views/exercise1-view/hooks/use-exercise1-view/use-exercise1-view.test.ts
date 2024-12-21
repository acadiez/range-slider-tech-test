import { renderHook, waitFor } from '@testing-library/react';
import { useExercise1View } from './use-exercise1-view';
import { getExercise1 } from '@/services';
import { DEFAULT_DATA } from './constants';

jest.mock('@/services', () => ({
  getExercise1: jest.fn(),
}));

// Mock console.error
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

const setup = () => {
  const { result } = renderHook(() => useExercise1View());
  return { result };
};

describe('useExercise1View hook', () => {
  it('should initialize with loading true and data null, then should set loading to false and set data', async () => {
    const values = { min: 10, max: 90 };
    (getExercise1 as jest.Mock).mockResolvedValue(values);

    const { result } = setup();

    expect(result.current.state.loading).toBe(true);
    expect(result.current.state.data).toBeNull();

    await waitFor(() => expect(result.current.state.loading).toBe(false));

    expect(result.current.state.data).toEqual(values);
  });

  it('should throw an error and set default values on invalid data', async () => {
    (getExercise1 as jest.Mock).mockResolvedValue({ mun: null, mux: null });

    const { result } = setup();

    await waitFor(() => expect(result.current.state.loading).toBe(false));

    expect(result.current.state.data).toEqual(DEFAULT_DATA);
    expect(console.error).toHaveBeenCalledWith(new Error('Invalid data'));
  });
});
