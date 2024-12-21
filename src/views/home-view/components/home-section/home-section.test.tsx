import { render, screen } from '@testing-library/react';
import { HomeSection, HomeSectionProps } from './home-section';
import { useHomeSection } from './hooks';
import { ButtonProps } from '@/ui/button/button';

jest.mock('./hooks', () => ({
  useHomeSection: jest.fn(),
}));

const BUTTON_TEST_ID = 'button';

jest.mock('@/ui', () => ({
  Button: ({ label, onClick, variant }: ButtonProps) => (
    <div data-testid={BUTTON_TEST_ID} data-label={label} data-onClick={onClick.toString()} data-variant={variant} />
  ),
}));

const MOCK_DATA: HomeSectionProps = {
  title: 'Exercise 1',
  action: 'Exercise 1',
  redirect: '/exercise1',
  variant: 'primary',
};

const setup = (variant = MOCK_DATA.variant) => {
  const mockHandleRedirect = jest.fn();
  (useHomeSection as jest.Mock).mockReturnValue({
    methods: { handleRedirect: mockHandleRedirect },
  });

  render(<HomeSection {...MOCK_DATA} variant={variant} />);

  return { mockHandleRedirect };
};

describe('Home Section', () => {
  it('renders a container, a title and a button', () => {
    const { mockHandleRedirect } = setup();

    const container = screen.getByTestId('home-section');
    const title = screen.getByRole('heading');
    const button = screen.getByTestId(BUTTON_TEST_ID);

    expect(container).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(MOCK_DATA.title);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-label', MOCK_DATA.action);
    expect(button).toHaveAttribute('data-variant', 'contained');
    expect(button.getAttribute('data-onClick')).toBe(mockHandleRedirect.toString());
  });

  it('renders a secondary button', () => {
    const variant = 'secondary';

    setup(variant);

    const button = screen.getByTestId(BUTTON_TEST_ID);

    expect(button).toHaveAttribute('data-variant', 'outlined');
  });
});
