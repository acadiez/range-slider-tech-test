import { getExercise1 } from '@/services';
import { Exercise1Data } from '@/services/get-exercise1/types';
import { useCallback, useEffect, useState } from 'react';

export const useExercise1View = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Exercise1Data | null>(null);

  const setDefaultValues = useCallback(() => setData({ min: 0, max: 100 }), []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getExercise1();
        if (result?.min && result?.max) setData(result);
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
