import { fetchData, EXERCISE_1 } from '@/api';
import { getExercise1 } from './get-exercise1';
import { Exercise1Data } from './types';
import { DEFAULT_DATA } from '@/views/exercise1-view/constants';

jest.mock('@/api', () => ({
  fetchData: jest.fn(),
}));

describe('getExercise1 service', () => {
  it('fetches and returns exercise 1 data', async () => {
    const mockData: Exercise1Data = DEFAULT_DATA;
    (fetchData as jest.Mock).mockResolvedValue(mockData);

    const data = await getExercise1();

    expect(fetchData).toHaveBeenCalledWith(EXERCISE_1);
    expect(data).toEqual(mockData);
  });
});
