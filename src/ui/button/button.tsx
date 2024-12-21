import { memo, useMemo } from 'react';
import styles from './styles.module.scss';

export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined';
}

const { mainButton, contained, outlined } = styles;

const Button = ({ label, onClick, variant = 'contained' }: ButtonProps) => {
  const variantClass = useMemo(() => (variant === 'contained' ? contained : outlined), [variant]);
  return (
    <button className={`${mainButton} ${variantClass}`} onClick={onClick}>
      {label}
    </button>
  );
};

const MemoizedComponent = memo(Button);

export { MemoizedComponent as Button };
