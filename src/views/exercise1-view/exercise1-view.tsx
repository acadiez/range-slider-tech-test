import styles from './styles.module.scss';
import { RangeSlider } from '@/components';
import { Exercise1Data } from '@/services/get-exercise1/types';
import { DEFAULT_DATA } from './constants';
import { useMemo } from 'react';

const { exercise1ViewContainer } = styles;

export interface Exercise1ViewProps {
  data: Exercise1Data;
}

export const Exercise1View = ({ data }: Exercise1ViewProps) => {
  const min = useMemo(() => (data?.min ? data.min : DEFAULT_DATA.min), [data.min]);
  const max = useMemo(() => (data?.max ? data.max : DEFAULT_DATA.max), [data.max]);

  return (
    <div className={exercise1ViewContainer} data-testid="exercise1-view">
      <h1>Exercise 1</h1>
      <RangeSlider type="currency" min={min} max={max} isEditable />
    </div>
  );
};
