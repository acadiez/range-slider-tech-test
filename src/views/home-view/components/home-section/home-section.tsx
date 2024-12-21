import { memo, useMemo } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/ui';
import { useHomeSection } from './hooks';

export interface HomeSectionProps {
  title: string;
  action: string;
  redirect: string;
  variant?: 'primary' | 'secondary';
}

const { homeSectionContainer } = styles;

const HomeSection = ({ title, action, redirect, variant = 'primary' }: HomeSectionProps) => {
  const {
    methods: { handleRedirect },
  } = useHomeSection({ redirect });

  const buttonVariant = useMemo(() => (variant === 'primary' ? 'contained' : 'outlined'), [variant]);

  return (
    <div className={homeSectionContainer} data-testid="home-section">
      <h1>{title}</h1>
      <Button label={action} onClick={handleRedirect} variant={buttonVariant} />
    </div>
  );
};

const MemoizedComponent = memo(HomeSection);

export { MemoizedComponent as HomeSection };
