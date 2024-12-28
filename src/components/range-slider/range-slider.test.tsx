import { render, screen } from '@testing-library/react';
import { RangeSliderProps } from './types';
import { RangeSlider } from './range-slider';
import { DEFAULT_RANGE } from '@/views/exercise2-view/constants';
import { DEFAULT_DATA } from '@/views/exercise1-view/constants';
import { useRangeSlider } from './hooks';
import { RangeLabelProps } from './components/range-label/types';
import { ThumbProps } from './components/thumb/thumb';
import { TrackProps } from './components/track/track';

jest.mock('./hooks', () => ({
  useRangeSlider: jest.fn(),
}));

const RANGE_LABEL_TEST_ID = 'range-label';
const THUMB_TEST_ID = 'thumb';
const TRACK_TEST_ID = 'track';

jest.mock('./components', () => ({
  Thumb: ({ value, handleMouseDown, handleKeyDown }: ThumbProps) => (
    <div
      data-testid={THUMB_TEST_ID}
      data-value={value}
      data-mousedown={handleMouseDown.toString()}
      data-keydown={handleKeyDown.toString()}
    />
  ),
  Track: ({ value1, value2 }: TrackProps) => (
    <div data-testid={TRACK_TEST_ID} data-value1={value1} data-value2={value2} />
  ),
  RangeLabel: ({ value, position, isEditable, onChange }: RangeLabelProps) => (
    <div
      data-testid={RANGE_LABEL_TEST_ID}
      data-value={value}
      data-position={position}
      data-editable={isEditable}
      data-change={onChange?.toString()}
    />
  ),
}));

const MOCK_DATA: RangeSliderProps = {
  type: 'number',
  ...DEFAULT_DATA,
  isEditable: true,
};

const MOCK_DATA_RANGE: RangeSliderProps = {
  type: 'number',
  range: DEFAULT_RANGE,
};

const setup = (data: RangeSliderProps, isDragging = false) => {
  const defaultMin = Array.isArray(data?.range) ? data.range[0] : data.min;
  const defaultMax = Array.isArray(data?.range) ? data.range[data.range.length - 1] : data.max;

  (useRangeSlider as jest.Mock).mockReturnValue({
    state: { defaultMin, defaultMax, value1: defaultMin, value2: defaultMax, sliderRef: jest.fn(), isDragging },
    methods: {
      handleMouseDown: jest.fn(),
      handleKeyDown: jest.fn(),
      handleChangeValue: jest.fn(),
      handleMove: jest.fn(),
    },
  });

  render(<RangeSlider {...data} />);
};

describe('RangeSlider component', () => {
  it('renders slider min max', () => {
    setup(MOCK_DATA);

    const container = screen.getByTestId('range-slider');
    const slider = screen.getByTestId('slider');
    const thumbs = screen.getAllByTestId(THUMB_TEST_ID);
    const track = screen.getByTestId(TRACK_TEST_ID);
    const labelsContainer = screen.getByTestId('labels');
    const labels = screen.getAllByTestId(RANGE_LABEL_TEST_ID);

    expect(container).toBeInTheDocument();
    expect(slider).toBeInTheDocument();

    expect(thumbs).toHaveLength(2);
    expect(thumbs[0]).toHaveAttribute('data-value', MOCK_DATA.min.toString());
    expect(thumbs[0].getAttribute('data-mousedown')).toContain('handleMouseDown');
    expect(thumbs[0].getAttribute('data-keydown')).toContain('handleKeyDown');
    expect(thumbs[1]).toHaveAttribute('data-value', MOCK_DATA.max.toString());
    expect(thumbs[1].getAttribute('data-mousedown')).toContain('handleMouseDown');
    expect(thumbs[1].getAttribute('data-keydown')).toContain('handleKeyDown');

    expect(track).toBeInTheDocument();
    expect(track).toHaveAttribute('data-value1', MOCK_DATA.min.toString());
    expect(track).toHaveAttribute('data-value2', MOCK_DATA.max.toString());

    expect(labelsContainer).toBeInTheDocument();
    expect(labels).toHaveLength(2);
    expect(labels[0]).toHaveAttribute('data-value', MOCK_DATA.min.toString());
    expect(labels[0]).toHaveAttribute('data-editable', (!!MOCK_DATA.isEditable).toString());
    expect(labels[0].getAttribute('data-change')).toContain('handleChangeValue');
    expect(labels[1]).toHaveAttribute('data-value', MOCK_DATA.max.toString());
    expect(labels[1]).toHaveAttribute('data-position', 'right');
    expect(labels[1]).toHaveAttribute('data-editable', (!!MOCK_DATA.isEditable).toString());
    expect(labels[1].getAttribute('data-change')).toContain('handleChangeValue');
  });

  it('renders slider range', () => {
    setup(MOCK_DATA_RANGE);

    const thumbs = screen.getAllByTestId(THUMB_TEST_ID);
    const track = screen.getByTestId(TRACK_TEST_ID);
    const labels = screen.getAllByTestId(RANGE_LABEL_TEST_ID);

    const minRange = MOCK_DATA_RANGE.range[0].toString();
    const maxRange = MOCK_DATA_RANGE.range[MOCK_DATA_RANGE.range.length - 1].toString();

    expect(thumbs).toHaveLength(2);
    expect(thumbs[0]).toHaveAttribute('data-value', minRange);
    expect(thumbs[1]).toHaveAttribute('data-value', maxRange);
    expect(track).toBeInTheDocument();
    expect(track).toHaveAttribute('data-value1', minRange);
    expect(track).toHaveAttribute('data-value2', maxRange);
    expect(labels).toHaveLength(2);
    expect(labels[0]).toHaveAttribute('data-value', minRange);
    expect(labels[1]).toHaveAttribute('data-value', maxRange);
  });

  it('renders dragging class', () => {
    setup(MOCK_DATA, true);

    const container = screen.getByTestId('range-slider');

    expect(container).toHaveClass('dragging');
  });
});
