import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Exercise1 from './page';
import { Exercise1ViewProps } from '@/views/exercise1-view/exercise1-view';
import { DEFAULT_DATA } from '@/views/exercise1-view/constants';
import { getExercise1 } from '@/services';

jest.mock('@/services', () => ({
  getExercise1: jest.fn(),
}));

const EXERCISE1_VIEW_TEST_ID = 'exercise1-view';
jest.mock('@/views', () => ({
  Exercise1View: ({ data }: Exercise1ViewProps) => (
    <div data-testid={EXERCISE1_VIEW_TEST_ID} data-data={JSON.stringify(data)} />
  ),
}));

describe('Exercise 1 Page', () => {
  it('should render exercise 1 view', async () => {
    (getExercise1 as jest.Mock).mockResolvedValue(DEFAULT_DATA);

    const page = await Exercise1();
    render(page);

    const view = screen.getByTestId(EXERCISE1_VIEW_TEST_ID);

    expect(view).toBeInTheDocument();
    expect(view).toHaveAttribute('data-data', JSON.stringify(DEFAULT_DATA));
  });
});
