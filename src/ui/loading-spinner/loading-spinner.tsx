import styles from './styles.module.scss';

const { spin } = styles;

export const LoadingSpinner = () => {
  return (
    <svg width="50" height="50" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <circle
        className={spin}
        cx="400"
        cy="400"
        fill="none"
        r="200"
        strokeWidth="50"
        stroke="#9839c4"
        strokeDasharray="700 1400"
        strokeLinecap="round"
      />
    </svg>
  );
};
