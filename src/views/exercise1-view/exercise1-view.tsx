'use client';

import styles from './styles.module.scss';
import { RangeSlider } from '@/components';

const { exercise1ViewContainer } = styles;

export const Exercise1View = () => {
  return (
    <div className={exercise1ViewContainer}>
      <h1>Exercise 1</h1>
      <RangeSlider type="currency" min={0} max={100} isEditable />
    </div>
  );
};
