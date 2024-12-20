import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { HomeView } from './home-view';

describe('Page', () => {
  it('renders a heading', () => {
    render(<HomeView />);

    const heading = screen.getByRole('button', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
