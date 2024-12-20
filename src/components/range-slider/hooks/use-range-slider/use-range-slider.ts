import { useCallback, useRef, useState } from 'react';

interface UseRangeSliderProps {
  min: number;
  max: number;
}

export const useRangeSlider = ({ min, max }: UseRangeSliderProps) => {
  const [value1, setValue1] = useState(min);
  const [value2, setValue2] = useState(max);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleChangeValue = useCallback(
    ({ index, value }: { index: number; value: number }) => {
      const newValue = Math.min(Math.max(value, min), max);

      if (index === 1) {
        setValue1(Math.min(newValue, value2));
      } else {
        setValue2(Math.max(newValue, value1));
      }
    },
    [max, min, value1, value2],
  );

  const handleMove = useCallback(
    (index: number, e: MouseEvent) => {
      if (!sliderRef.current) return;

      const sliderRect = sliderRef.current.getBoundingClientRect();
      const value = Math.round(((e.clientX - sliderRect.left) / sliderRect.width) * (max - min) + min);
      handleChangeValue({ index, value });
    },
    [handleChangeValue, max, min],
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
    state: { value1, value2, sliderRef, isDragging },
    methods: { handleMouseDown, handleChangeValue },
  };
};
