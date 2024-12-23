import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Exercise2 from './page';
import { DEFAULT_RANGE } from '@/views/exercise2-view/constants';
import { getExercise2 } from '@/services';
import { Exercise2ViewProps } from '@/views/exercise2-view/exercise2-view';

jest.mock('@/services', () => ({
  getExercise2: jest.fn(),
}));

const EXERCISE2_VIEW_TEST_ID = 'exercise2-view';
jest.mock('@/views', () => ({
  Exercise2View: ({ data }: Exercise2ViewProps) => (
    <div data-testid={EXERCISE2_VIEW_TEST_ID} data-data={JSON.stringify(data)} />
  ),
}));

describe('Exercise 2 Page', () => {
  it('should render exercise 2 view', async () => {
    (getExercise2 as jest.Mock).mockResolvedValue({ range: DEFAULT_RANGE });

    const page = await Exercise2();
    render(page);

    const view = screen.getByTestId(EXERCISE2_VIEW_TEST_ID);

    expect(view).toBeInTheDocument();
    expect(view).toHaveAttribute('data-data', JSON.stringify({ range: DEFAULT_RANGE }));
  });
});
