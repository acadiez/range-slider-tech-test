import { fireEvent, render, screen } from '@testing-library/react';
import { RangeSliderContext, RangeSliderContextType } from '../../context';
import { Thumb, ThumbProps } from './thumb';

const MOCK_DATA: ThumbProps = {
  value: 0,
  handleMouseDown: jest.fn(),
  handleKeyDown: jest.fn(),
};

const MOCK_CONTEXT: RangeSliderContextType = {
  min: 0,
  max: 100,
  type: 'number',
  isDragging: false,
};

const setup = (isDragging = MOCK_CONTEXT.isDragging) => {
  render(
    <RangeSliderContext.Provider value={{ ...MOCK_CONTEXT, isDragging }}>
      <Thumb {...MOCK_DATA} />
    </RangeSliderContext.Provider>,
  );
};

describe('Thumb component', () => {
  it('renders the thumb with the correct styles', () => {
    setup();

    const thumb = screen.getByTestId('thumb');

    expect(thumb).toBeInTheDocument();
    expect(thumb).toHaveStyle(`left: 0%`);
    expect(thumb).toHaveStyle(`cursor: grab`);
  });

  it('renders cursor dragging', () => {
    setup(true);

    const thumb = screen.getByTestId('thumb');

    expect(thumb).toHaveStyle(`cursor: grabbing`);
  });

  it('calls handleMouseDown when thumb is clicked', () => {
    setup();

    const thumb = screen.getByTestId('thumb');

    fireEvent.mouseDown(thumb);

    expect(MOCK_DATA.handleMouseDown).toHaveBeenCalled();
  });

  it('calls handleKeyDown when thumb is focused and key is pressed', () => {
    setup();

    const thumb = screen.getByTestId('thumb');

    fireEvent.keyDown(thumb, { key: 'Enter' });

    expect(MOCK_DATA.handleKeyDown).toHaveBeenCalled();
  });
});
