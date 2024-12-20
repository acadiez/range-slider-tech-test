'use client';

import styles from './styles.module.scss';
import { RangeSlider } from '@/components';

const { exercise1ViewContainer } = styles;

export const Exercise2View = () => {
  return (
    <div className={exercise1ViewContainer}>
      <h1>Exercise 2</h1>
      <RangeSlider min={0} max={100} />
    </div>
  );
};
