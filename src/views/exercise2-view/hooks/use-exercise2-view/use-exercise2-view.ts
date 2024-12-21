import { getExercise2 } from '@/services';
import { Exercise2Data } from '@/services/get-exercise2/types';
import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_RANGE } from './constants';

export const useExercise2View = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Exercise2Data | null>(null);

  const setDefaultValues = useCallback(() => setData({ range: DEFAULT_RANGE }), []);

  const loadData = useCallback(async () => {
    try {
      const result = await getExercise2();
      if (result?.range) setData(result);
      else throw new Error('Invalid data');
    } catch (error) {
      console.error(error);
      setDefaultValues();
    }

    setLoading(false);
  }, [setDefaultValues]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { state: { data, loading } };
};
