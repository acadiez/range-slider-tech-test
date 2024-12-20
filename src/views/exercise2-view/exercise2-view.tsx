'use client';

import styles from './styles.module.scss';
import { RangeSlider } from '@/components';

const { exercise1ViewContainer } = styles;

export const Exercise2View = () => {
  return (
    <div className={exercise1ViewContainer}>
      <h1>Exercise 2</h1>
      <RangeSlider type="currency" range={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]} />
    </div>
  );
};
