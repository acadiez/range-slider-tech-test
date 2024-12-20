import { rangeSliderTypes } from '../../types';

export type RangeSliderContextType = {
  type: keyof typeof rangeSliderTypes;
  min: number;
  max: number;
  isDragging: boolean;
};
