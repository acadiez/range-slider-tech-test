import { memo, useContext, useMemo } from 'react';
import styles from './styles.module.scss';
import { RangeSliderContext, RangeSliderContextType } from '../../context';

export interface ThumbProps {
  value: number;
  handleMouseDown: (event: React.MouseEvent) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

const { thumb } = styles;

const Thumb = ({ value, handleMouseDown, handleKeyDown }: ThumbProps) => {
  const { min, max, isDragging } = useContext(RangeSliderContext) as RangeSliderContextType;

  const leftStyle = useMemo(() => `${((value - min) / (max - min)) * 100}%`, [max, min, value]);
  const cursorStyle = useMemo(() => (isDragging ? 'grabbing' : 'grab'), [isDragging]);

  return (
    <div
      data-testid="thumb"
      tabIndex={0}
      className={thumb}
      style={{
        left: leftStyle,
        cursor: cursorStyle,
      }}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
    />
  );
};

const MemoizedComponent = memo(Thumb);

export { MemoizedComponent as Thumb };
