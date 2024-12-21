import { fetchData, EXERCISE_2 } from '@/api';
import { Exercise2Data } from './types';

export const getExercise2 = async () => {
  const data: Exercise2Data = await fetchData(EXERCISE_2);

  return data;
};
