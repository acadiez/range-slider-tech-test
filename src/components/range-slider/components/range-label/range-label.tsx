import { memo, useContext, useMemo } from 'react';
import styles from './styles.module.scss';
import { RangeLabelProps } from './types';
import { useRangeLabel } from './hooks';
import { InputNumber } from '@/ui';
import { RangeSliderContext, RangeSliderContextType } from '../../context';

const { rangeLabelContainer } = styles;

const RangeLabel = ({ value, isEditable, onChange, position = 'left' }: RangeLabelProps) => {
  const {
    state: { isEditing },
    methods: { handleChange, handleEdit },
  } = useRangeLabel({ onChange, isEditable });
  const { max, min } = useContext(RangeSliderContext) as RangeSliderContextType;

  const leftStyle = useMemo(() => `${position === 'left' ? 0 : '100%'}`, [position]);
  const cursorStyle = useMemo(() => (!!isEditable ? 'pointer' : 'auto'), [isEditable]);

  return (
    <div
      className={rangeLabelContainer}
      style={{
        left: leftStyle,
        cursor: cursorStyle,
      }}
    >
      {(!isEditing && <p onClick={handleEdit}>{value}</p>) || (
        <InputNumber value={value} max={max} min={min} onChange={handleChange} />
      )}
    </div>
  );
};

const MemoizedComponent = memo(RangeLabel);

export { MemoizedComponent as RangeLabel };
