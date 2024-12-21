import { render, screen } from '@testing-library/react';
import { RangeSliderContext, RangeSliderContextType } from '../../context';
import { RangeLabel } from './range-label';
import { RangeLabelProps } from './types';
import { useRangeLabel } from './hooks';
import { InputNumberProps } from '@/ui/input-number/input-number';

jest.mock('./hooks', () => ({
  useRangeLabel: jest.fn(),
}));

const INPUT_TEST_ID = 'thumb';

jest.mock('@/ui', () => ({
  InputNumber: ({ value, max, min, onChange }: InputNumberProps) => (
    <div
      data-testid={INPUT_TEST_ID}
      data-value={value}
      data-max={max}
      data-min={min}
      data-change={onChange.toString()}
    />
  ),
}));

const MOCK_DATA: RangeLabelProps = {
  value: 0,
  isEditable: false,
  onChange: jest.fn(),
  position: 'left',
};

const MOCK_CONTEXT: RangeSliderContextType = {
  min: 0,
  max: 100,
  type: 'number',
  isDragging: false,
};

interface SetUpProps {
  position?: 'left' | 'right';
  isEditable?: boolean;
  isEditing?: boolean;
}

const setup = ({ isEditable = MOCK_DATA.isEditable, isEditing = false, position = MOCK_DATA.position }: SetUpProps) => {
  const handleChange = jest.fn();
  const handleEdit = jest.fn();

  (useRangeLabel as jest.Mock).mockReturnValue({
    state: { isEditing },
    methods: { handleChange, handleEdit },
  });

  render(
    <RangeSliderContext.Provider value={{ ...MOCK_CONTEXT }}>
      <RangeLabel {...MOCK_DATA} isEditable={isEditable} position={position} />
    </RangeSliderContext.Provider>,
  );

  return { handleChange, handleEdit };
};

describe('RangeLabel component', () => {
  it('renders the label with the correct styles', () => {
    setup({});

    const rangeLabel = screen.getByTestId('range-label');
    const label = screen.getByRole('paragraph');
    const input = screen.queryByTestId(INPUT_TEST_ID);

    expect(rangeLabel).toBeInTheDocument();
    expect(rangeLabel).toHaveStyle(`left: 0px`);
    expect(rangeLabel).toHaveStyle(`cursor: auto`);
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('0');
    expect(input).not.toBeInTheDocument();
  });

  it('renders right position', () => {
    setup({ position: 'right' });

    const rangeLabel = screen.getByTestId('range-label');

    expect(rangeLabel).toHaveStyle(`left: 100%`);
  });

  it('renders editable', () => {
    const { handleEdit } = setup({ isEditable: true });

    const rangeLabel = screen.getByTestId('range-label');
    const label = screen.getByRole('paragraph');

    expect(rangeLabel).toHaveStyle(`cursor: pointer`);

    label.click();

    expect(handleEdit).toHaveBeenCalled();
  });

  it('renders isEditing', () => {
    const { handleChange } = setup({ isEditing: true });

    const label = screen.queryByRole('paragraph');
    const input = screen.getByTestId(INPUT_TEST_ID);

    expect(label).not.toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('data-value', MOCK_DATA.value.toString());
    expect(input).toHaveAttribute('data-max', MOCK_CONTEXT.max.toString());
    expect(input).toHaveAttribute('data-min', MOCK_CONTEXT.min.toString());
    expect(input).toHaveAttribute('data-change', handleChange.toString());
  });
});
