import { memo, useMemo } from 'react';
import styles from './styles.module.scss';
import { useRangeSlider } from './hooks';
import { RangeLabel, Thumb, Track } from './components';
import { RangeSliderContext } from './context';
import { RangeSliderProps } from './types';

const { sliderContainer, slider, dragging, labelsContainer } = styles;

const RangeSlider = ({ type = 'number', min, max, isEditable, range }: RangeSliderProps) => {
  const {
    state: { defaultMin, defaultMax, value1, value2, sliderRef, isDragging },
    methods: { handleMouseDown, handleChangeValue },
  } = useRangeSlider({ min, max, range });

  const draggingClass = useMemo(() => (isDragging ? dragging : ''), [isDragging]);

  return (
    <RangeSliderContext.Provider value={{ type, min: defaultMin, max: defaultMax, isDragging }}>
      <div className={`${sliderContainer} ${draggingClass}`} data-testid="range-slider">
        <div ref={sliderRef} className={slider} data-testid="slider">
          <Thumb value={value1} handleMouseDown={(e) => handleMouseDown({ e, index: 1 })} />
          <Thumb value={value2} handleMouseDown={(e) => handleMouseDown({ e, index: 2 })} />
          <Track value1={value1} value2={value2} />
        </div>
        <div className={labelsContainer} data-testid="labels">
          <RangeLabel
            value={value1}
            isEditable={!!isEditable}
            onChange={(value: number) => {
              handleChangeValue({ index: 1, value });
            }}
          />
          <RangeLabel
            value={value2}
            position="right"
            isEditable={!!isEditable}
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
