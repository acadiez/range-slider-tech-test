import { memo, useContext, useMemo } from 'react';
import styles from './styles.module.scss';
import { RangeSliderContext, RangeSliderContextType } from '../../context';

interface TrackProps {
  value1: number;
  value2: number;
}

const { track } = styles;

const Track = ({ value1, value2 }: TrackProps) => {
  const { min, max } = useContext(RangeSliderContext) as RangeSliderContextType;

  const leftStyle = useMemo(() => `${((value1 - min) / (max - min)) * 100}%`, [max, min, value1]);
  const rightStyle = useMemo(() => `${100 - ((value2 - min) / (max - min)) * 100}%`, [max, min, value2]);

  return (
    <div
      className={track}
      style={{
        left: leftStyle,
        right: rightStyle,
      }}
    />
  );
};

const MemoizedComponent = memo(Track);

export { MemoizedComponent as Track };
