'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { debounce } from 'lodash';

export interface InputNumberProps {
  value: number;
  max: number;
  min: number;
  onChange: (value: number) => void;
}

const { inputNumber } = styles;

const InputNumber = ({ value, max, min, onChange }: InputNumberProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const debouncedOnChange = useMemo(
    () =>
      debounce((newValue: number) => {
        onChange(newValue);
      }, 400),
    [onChange],
  );

  useEffect(() => {
    debouncedOnChange(inputValue);

    return () => {
      debouncedOnChange.cancel();
    };
  }, [inputValue, debouncedOnChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  return <input type="number" className={inputNumber} value={inputValue} onChange={handleChange} max={max} min={min} />;
};

const MemoizedComponent = memo(InputNumber);

export { MemoizedComponent as InputNumber };
