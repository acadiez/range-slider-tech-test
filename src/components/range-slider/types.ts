export enum rangeSliderTypes {
  number = '',
  currency = '$',
  percent = '%',
}

interface CommonRangeSliderProps {
  type?: keyof typeof rangeSliderTypes;
}

interface MinMaxRangeSliderProps extends CommonRangeSliderProps {
  min: number;
  max: number;
  isEditable?: boolean;
  range?: never;
}

interface RangeRangeSliderContextProps extends CommonRangeSliderProps {
  range: number[];
  min?: never;
  max?: never;
  isEditable?: never;
}

export type RangeSliderProps = MinMaxRangeSliderProps | RangeRangeSliderContextProps;
