import { render, screen } from '@testing-library/react';
import { Track, TrackProps } from './track';
import { RangeSliderContext, RangeSliderContextType } from '../../context';

const MOCK_DATA: TrackProps = {
  value1: 0,
  value2: 100,
};

const MOCK_CONTEXT: RangeSliderContextType = {
  min: 0,
  max: 100,
  type: 'number',
  isDragging: false,
};

describe('Track component', () => {
  it('renders the track with the correct styles', () => {
    render(
      <RangeSliderContext.Provider value={MOCK_CONTEXT}>
        <Track {...MOCK_DATA} />
      </RangeSliderContext.Provider>,
    );

    const track = screen.getByTestId('track');

    expect(track).toBeInTheDocument();
    expect(track).toHaveStyle(`left: 0%`);
    expect(track).toHaveStyle(`right: 0%`);
  });
});
