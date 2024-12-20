import { memo, useMemo } from 'react';
import styles from './styles.module.scss';
import { useRangeSlider } from './hooks';
import { RangeLabel, Thumb, Track } from './components';
import { RangeSliderContext } from './context';

interface RangeSliderProps {
  min: number;
  max: number;
}

const { sliderContainer, slider, dragging, labelsContainer } = styles;

const RangeSlider = ({ min, max }: RangeSliderProps) => {
  const {
    state: { value1, value2, sliderRef, isDragging },
    methods: { handleMouseDown, handleChangeValue },
  } = useRangeSlider({ min, max });

  const draggingClass = useMemo(() => (isDragging ? dragging : ''), [isDragging]);

  return (
    <RangeSliderContext.Provider value={{ min, max, isDragging }}>
      <div className={`${sliderContainer} ${draggingClass}`}>
        <div ref={sliderRef} className={slider}>
          <Thumb value={value1} handleMouseDown={(e) => handleMouseDown({ e, index: 1 })} />
          <Thumb value={value2} handleMouseDown={(e) => handleMouseDown({ e, index: 2 })} />
          <Track value1={value1} value2={value2} />
        </div>
        <div className={labelsContainer}>
          <RangeLabel
            value={value1}
            isEditable
            onChange={(value: number) => {
              handleChangeValue({ index: 1, value });
            }}
          />
          <RangeLabel
            value={value2}
            position="right"
            isEditable
            onChange={(value: number) => {
              handleChangeValue({ index: 2, value });
            }}
          />
        </div>
      </div>
    </RangeSliderContext.Provider>
  );
};

const MemoizedComponent = memo(RangeSlider);

export { MemoizedComponent as RangeSlider };
