import { getExercise2 } from '@/services';
import { Exercise2Data } from '@/services/get-exercise2/types';
import { useCallback, useEffect, useState } from 'react';

export const useExercise2View = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Exercise2Data | null>(null);

  const setDefaultValues = useCallback(() => setData({ range: [0, 10, 20, 30, 40, 50] }), []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getExercise2();
        if (result?.range) setData(result);
        else throw new Error('Invalid data');
      } catch (error) {
        console.error(error);
        setDefaultValues();
      }

      setLoading(false);
    };

    loadData();
  }, [setDefaultValues]);

  return { state: { data, loading } };
};
