import { useCallback, useMemo, useRef, useState } from 'react';
import { getRangeValue } from '../../helpers';

interface UseRangeSliderProps {
  min?: number;
  max?: number;
  range?: number[];
}

export const useRangeSlider = ({ min = 0, max = 100, range }: UseRangeSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const defaultMin = useMemo(() => (Array.isArray(range) ? range[0] : min), [min, range]);
  const defaultMax = useMemo(() => (Array.isArray(range) ? range[range.length - 1] : max), [max, range]);
  const [value1, setValue1] = useState(defaultMin);
  const [value2, setValue2] = useState(defaultMax);

  const handleChangeValue = useCallback(
    ({ index, value }: { index: number; value: number }) => {
      const calculatedValue = Math.min(Math.max(value, defaultMin), defaultMax);
      const newValue = getRangeValue(calculatedValue, range);

      if (index === 1) {
        setValue1(Math.min(newValue, value2));
      } else {
        setValue2(Math.max(newValue, value1));
      }
    },
    [defaultMax, defaultMin, range, value1, value2],
  );

  const handleMove = useCallback(
    (index: number, e: MouseEvent) => {
      if (!sliderRef.current) return;

      const sliderRect = sliderRef.current.getBoundingClientRect();
      const value = Math.round(
        ((e.clientX - sliderRect.left) / sliderRect.width) * (defaultMax - defaultMin) + defaultMin,
      );
      handleChangeValue({ index, value });
    },
    [handleChangeValue, defaultMax, defaultMin],
  );

  const handleMouseDown = useCallback(
    ({ e, index }: { e: React.MouseEvent; index: number }) => {
      e.preventDefault();
      setIsDragging(true);
      const handleMoveBound = handleMove.bind(null, index);

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMoveBound);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMoveBound);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [handleMove],
  );

  return {
    state: { defaultMin, defaultMax, value1, value2, sliderRef, isDragging },
    methods: { handleMouseDown, handleChangeValue },
  };
};
