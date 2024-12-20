'use client';

import { LoadingSpinner } from '@/ui';
import { useExercise1View } from './hooks';
import styles from './styles.module.scss';
import { RangeSlider } from '@/components';

const { exercise1ViewContainer } = styles;

export const Exercise1View = () => {
  const {
    state: { data, loading },
  } = useExercise1View();

  return (
    <div className={exercise1ViewContainer}>
      <h1>Exercise 1</h1>
      {(loading && <LoadingSpinner />) ||
        (data && <RangeSlider type="currency" min={data.min} max={data.max} isEditable />)}
    </div>
  );
};
