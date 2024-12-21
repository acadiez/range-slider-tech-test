import { render, screen } from '@testing-library/react';
import { Button, ButtonProps } from './button';

const MOCK_DATA: ButtonProps = {
  label: 'Click me',
  onClick: jest.fn(),
  variant: 'contained',
};

const setup = (variant = MOCK_DATA.variant) => {
  render(<Button {...MOCK_DATA} variant={variant} />);
};

describe('Button ui', () => {
  it('renders a button, contained by default', () => {
    setup();

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(MOCK_DATA.label);
    expect(button).toHaveClass('contained');
  });

  it('renders a button, outlined', () => {
    setup('outlined');

    const button = screen.getByRole('button');

    expect(button).toHaveClass('outlined');
  });

  it('calls onClick when clicked', () => {
    setup();

    const button = screen.getByRole('button');

    button.click();

    expect(MOCK_DATA.onClick).toHaveBeenCalledTimes(1);
  });
});
