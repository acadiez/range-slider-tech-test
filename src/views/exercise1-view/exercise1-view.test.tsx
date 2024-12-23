import { render, screen } from '@testing-library/react';
import { Exercise1View } from './exercise1-view';
import { RangeSliderProps } from '@/components/range-slider/types';
import { DEFAULT_DATA } from './constants';
import { Exercise1Data } from '@/services/get-exercise1/types';

const RANGE_SLIDER_TEST_ID = 'range-slider';

jest.mock('@/components', () => ({
  RangeSlider: ({ type, min, max, isEditable }: RangeSliderProps) => (
    <div data-testid={RANGE_SLIDER_TEST_ID} data-type={type} data-min={min} data-max={max} data-editable={isEditable} />
  ),
}));

const setup = (data = DEFAULT_DATA) => {
  render(<Exercise1View data={data} />);
};

describe('Exercise1View View', () => {
  it('renders a container, a title, and a range slider', () => {
    setup();

    const container = screen.getByTestId('exercise1-view');
    const title = screen.getByRole('heading');
    const rangeSlider = screen.getByTestId(RANGE_SLIDER_TEST_ID);

    expect(container).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Exercise 1');
    expect(rangeSlider).toBeInTheDocument();
    expect(rangeSlider).toHaveAttribute('data-type', 'currency');
    expect(rangeSlider).toHaveAttribute('data-min', DEFAULT_DATA.min.toString());
    expect(rangeSlider).toHaveAttribute('data-max', DEFAULT_DATA.max.toString());
    expect(rangeSlider).toHaveAttribute('data-editable', 'true');
  });

  it('renders with provided data', () => {
    const customData = { min: 10, max: 100 };
    setup(customData);

    const rangeSlider = screen.getByTestId(RANGE_SLIDER_TEST_ID);

    expect(rangeSlider).toHaveAttribute('data-min', customData.min.toString());
    expect(rangeSlider).toHaveAttribute('data-max', customData.max.toString());
  });

  it('renders default data if the object provided is wrong', () => {
    setup({} as unknown as Exercise1Data);

    const rangeSlider = screen.getByTestId(RANGE_SLIDER_TEST_ID);

    expect(rangeSlider).toHaveAttribute('data-min', DEFAULT_DATA.min.toString());
    expect(rangeSlider).toHaveAttribute('data-max', DEFAULT_DATA.max.toString());
  });
});
