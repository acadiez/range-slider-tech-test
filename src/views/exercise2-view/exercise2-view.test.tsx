import { render, screen } from '@testing-library/react';
import { Exercise2View } from './exercise2-view';
import { RangeSliderProps } from '@/components/range-slider/types';
import { DEFAULT_RANGE } from './constants';
import { Exercise2Data } from '@/services/get-exercise2/types';

const RANGE_SLIDER_TEST_ID = 'range-slider';

jest.mock('@/components', () => ({
  RangeSlider: ({ type, range }: RangeSliderProps) => (
    <div data-testid={RANGE_SLIDER_TEST_ID} data-type={type} data-range={range?.toString()} />
  ),
}));

const setup = (data = { range: DEFAULT_RANGE }) => {
  render(<Exercise2View data={data} />);
};

describe('Exercise2View View', () => {
  it('renders a container, a title, and a range slider', () => {
    setup();

    const container = screen.getByTestId('exercise2-view');
    const title = screen.getByRole('heading');
    const rangeSlider = screen.getByTestId(RANGE_SLIDER_TEST_ID);

    expect(container).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Exercise 2');
    expect(rangeSlider).toBeInTheDocument();
    expect(rangeSlider).toHaveAttribute('data-type', 'currency');
    expect(rangeSlider).toHaveAttribute('data-range', DEFAULT_RANGE.toString());
  });

  it('renders default data if the object provided is wrong', () => {
    setup({} as unknown as Exercise2Data);

    const rangeSlider = screen.getByTestId(RANGE_SLIDER_TEST_ID);

    expect(rangeSlider).toHaveAttribute('data-range', DEFAULT_RANGE.toString());
  });
});
