import { render, screen } from '@testing-library/react';
import { Exercise2View } from './exercise2-view';
import { RangeSliderProps } from '@/components/range-slider/types';
import { useExercise2View } from './hooks';

jest.mock('./hooks', () => ({
  useExercise2View: jest.fn(),
}));

const RANGE_SLIDER_TEST_ID = 'range-slider';

jest.mock('@/components', () => ({
  RangeSlider: ({ type, range }: RangeSliderProps) => (
    <div data-testid={RANGE_SLIDER_TEST_ID} data-type={type} data-range={range?.toString()} />
  ),
}));

const LOADING_SPINNER_TEST_ID = 'loading-spinner';

jest.mock('@/ui', () => ({
  LoadingSpinner: () => <div data-testid={LOADING_SPINNER_TEST_ID} />,
}));

const setup = (loading = true, data: RangeSliderProps | null = null) => {
  (useExercise2View as jest.Mock).mockReturnValue({
    state: { data, loading },
  });

  render(<Exercise2View />);
};

describe('Exercise2View View', () => {
  it('renders a container, a title, and a loading by default', () => {
    setup();

    const container = screen.getByTestId('exercise2-view');
    const title = screen.getByRole('heading');
    const loadingSpinner = screen.getByTestId(LOADING_SPINNER_TEST_ID);

    expect(container).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Exercise 2');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('renders a range slider when data is available', () => {
    const data = { range: [1, 2, 3] };

    setup(false, data);

    const rangeSlider = screen.getByTestId(RANGE_SLIDER_TEST_ID);

    expect(rangeSlider).toBeInTheDocument();
    expect(rangeSlider).toHaveAttribute('data-type', 'currency');
    expect(rangeSlider).toHaveAttribute('data-range', data.range.toString());
  });
});
