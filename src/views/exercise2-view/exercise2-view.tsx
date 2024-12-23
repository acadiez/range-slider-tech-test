import styles from './styles.module.scss';
import { RangeSlider } from '@/components';
import { Exercise2Data } from '@/services/get-exercise2/types';
import { DEFAULT_RANGE } from './constants';
import { useMemo } from 'react';

const { exercise2ViewContainer } = styles;

export interface Exercise2ViewProps {
  data: Exercise2Data;
}

export const Exercise2View = ({ data }: Exercise2ViewProps) => {
  const range = useMemo(() => (data?.range ? data.range : DEFAULT_RANGE), [data.range]);

  return (
    <div className={exercise2ViewContainer} data-testid="exercise2-view">
      <h1>Exercise 2</h1>
      <RangeSlider type="currency" range={range} />
    </div>
  );
};
