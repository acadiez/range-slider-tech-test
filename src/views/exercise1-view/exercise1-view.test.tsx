import { render, screen } from '@testing-library/react';
import { Exercise1View } from './exercise1-view';
import { RangeSliderProps } from '@/components/range-slider/types';
import { useExercise1View } from './hooks';

jest.mock('./hooks', () => ({
  useExercise1View: jest.fn(),
}));

const RANGE_SLIDER_TEST_ID = 'range-slider';

jest.mock('@/components', () => ({
  RangeSlider: ({ type, min, max, isEditable }: RangeSliderProps) => (
    <div data-testid={RANGE_SLIDER_TEST_ID} data-type={type} data-min={min} data-max={max} data-editable={isEditable} />
  ),
}));

const LOADING_SPINNER_TEST_ID = 'loading-spinner';

jest.mock('@/ui', () => ({
  LoadingSpinner: () => <div data-testid={LOADING_SPINNER_TEST_ID} />,
}));

const setup = (loading = true, data: RangeSliderProps | null = null) => {
  (useExercise1View as jest.Mock).mockReturnValue({
    state: { data, loading },
  });

  render(<Exercise1View />);
};

describe('Exercise1View View', () => {
  it('renders a container, a title, and a loading by default', () => {
    setup();

    const container = screen.getByTestId('exercise1-view');
    const title = screen.getByRole('heading');
    const loadingSpinner = screen.getByTestId(LOADING_SPINNER_TEST_ID);

    expect(container).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Exercise 1');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('renders a range slider when data is available', () => {
    const data = { min: 0, max: 100 };

    setup(false, data);

    const rangeSlider = screen.getByTestId(RANGE_SLIDER_TEST_ID);

    expect(rangeSlider).toBeInTheDocument();
    expect(rangeSlider).toHaveAttribute('data-type', 'currency');
    expect(rangeSlider).toHaveAttribute('data-min', data.min.toString());
    expect(rangeSlider).toHaveAttribute('data-max', data.max.toString());
    expect(rangeSlider).toHaveAttribute('data-editable', 'true');
  });
});
