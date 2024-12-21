import { fetchData, EXERCISE_2 } from '@/api';
import { getExercise2 } from './get-exercise2';
import { Exercise2Data } from './types';
import { DEFAULT_RANGE } from '@/views/exercise2-view/hooks/use-exercise2-view/constants';

jest.mock('@/api', () => ({
  fetchData: jest.fn(),
}));

describe('getExercise2 service', () => {
  it('fetches and returns exercise 2 data', async () => {
    const mockData: Exercise2Data = { range: DEFAULT_RANGE };
    (fetchData as jest.Mock).mockResolvedValue(mockData);

    const data = await getExercise2();

    expect(fetchData).toHaveBeenCalledWith(EXERCISE_2);
    expect(data).toEqual(mockData);
  });
});
