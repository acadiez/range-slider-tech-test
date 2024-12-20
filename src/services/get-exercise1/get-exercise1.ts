import { fetchData, EXERCISE_1 } from '@/api';
import { Exercise1Data } from './types';

export const getExercise1 = async () => {
  const data: Exercise1Data = await fetchData(EXERCISE_1);

  return data;
};
