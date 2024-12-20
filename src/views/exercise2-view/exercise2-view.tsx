'use client';

import { LoadingSpinner } from '@/ui';
import { useExercise2View } from './hooks';
import styles from './styles.module.scss';
import { RangeSlider } from '@/components';

const { exercise1ViewContainer } = styles;

export const Exercise2View = () => {
  const {
    state: { data, loading },
  } = useExercise2View();

  return (
    <div className={exercise1ViewContainer}>
      <h1>Exercise 2</h1>
      {(loading && <LoadingSpinner />) || (data && <RangeSlider type="currency" range={data.range} />)}
    </div>
  );
};
