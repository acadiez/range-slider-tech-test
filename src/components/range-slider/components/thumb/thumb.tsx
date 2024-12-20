import { memo, useContext, useMemo } from 'react';
import styles from './styles.module.scss';
import { RangeSliderContext, RangeSliderContextType } from '../../context';

interface ThumbProps {
  value: number;
  handleMouseDown: (event: React.MouseEvent) => void;
}

const { thumb } = styles;

const Thumb = ({ value, handleMouseDown }: ThumbProps) => {
  const { min, max, isDragging } = useContext(RangeSliderContext) as RangeSliderContextType;

  const leftStyle = useMemo(() => `${((value - min) / (max - min)) * 100}%`, [max, min, value]);
  const cursorStyle = useMemo(() => (isDragging ? 'grabbing' : 'grab'), [isDragging]);

  return (
    <div
      className={thumb}
      style={{
        left: leftStyle,
        cursor: cursorStyle,
      }}
      onMouseDown={handleMouseDown}
    />
  );
};

const MemoizedComponent = memo(Thumb);

export { MemoizedComponent as Thumb };
