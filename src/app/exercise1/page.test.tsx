import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Exercise1 from './page';

const EXERCISE1_VIEW_TEST_ID = 'exercise1-view';
jest.mock('@/views', () => ({
  Exercise1View: () => <div data-testid={EXERCISE1_VIEW_TEST_ID} />,
}));

describe('Exercise 1 Page', () => {
  it('should render exercise 1 view', () => {
    render(<Exercise1 />);
    const view = screen.getByTestId(EXERCISE1_VIEW_TEST_ID);
    expect(view).toBeInTheDocument();
  });
});
