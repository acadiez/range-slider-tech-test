'use client';

import styles from './styles.module.scss';
import { HomeSection } from './components';

const { homeViewContainer } = styles;

export const HomeView = () => {
  return (
    <div className={homeViewContainer}>
      <HomeSection title="Exercise 1" action="Exercise 1" redirect="/exercise1" />
      <HomeSection title="Exercise 2" action="Exercise 2" redirect="/exercise2" variant="secondary" />
    </div>
  );
};
