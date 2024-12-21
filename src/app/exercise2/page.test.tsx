import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Exercise2 from './page';

const EXERCISE2_VIEW_TEST_ID = 'exercise2-view';
jest.mock('@/views', () => ({
  Exercise2View: () => <div data-testid={EXERCISE2_VIEW_TEST_ID} />,
}));

describe('Exercise 2 Page', () => {
  it('should render exercise 2 view', () => {
    render(<Exercise2 />);
    const view = screen.getByTestId(EXERCISE2_VIEW_TEST_ID);
    expect(view).toBeInTheDocument();
  });
});
