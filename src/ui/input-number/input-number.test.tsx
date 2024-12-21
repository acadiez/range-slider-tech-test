import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { InputNumber, InputNumberProps } from './input-number';

jest.useFakeTimers();

const MOCK_DATA: InputNumberProps = {
  value: 0,
  max: 10,
  min: 0,
  onChange: jest.fn(),
};

const setup = () => {
  render(<InputNumber {...MOCK_DATA} />);
};

describe('InputNumber ui', () => {
  it('renders an input number with default value', () => {
    setup();

    const input = screen.getByRole('spinbutton');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(MOCK_DATA.value);
    expect(input).toHaveAttribute('max', MOCK_DATA.max.toString());
    expect(input).toHaveAttribute('min', MOCK_DATA.min.toString());
  });

  it('calls onChange when input value changes', async () => {
    setup();

    const input = screen.getByRole('spinbutton');

    userEvent.type(input, '5');

    jest.advanceTimersByTime(400);

    await waitFor(() => expect(input).toHaveValue(5));
    expect(MOCK_DATA.onChange).toHaveBeenCalled();
  });
});
