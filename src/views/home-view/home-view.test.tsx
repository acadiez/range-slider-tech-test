import { render, screen } from '@testing-library/react';
import { HomeView } from './home-view';

const HOME_SECTION_TEST_ID = 'home-section';

jest.mock('./components', () => ({
  HomeSection: () => <div data-testid={HOME_SECTION_TEST_ID} />,
}));

describe('Home View', () => {
  it('renders a container and two home sections', () => {
    render(<HomeView />);

    const container = screen.getByTestId('home-view');
    const homeSections = screen.getAllByTestId(HOME_SECTION_TEST_ID);

    expect(container).toBeInTheDocument();
    expect(homeSections).toHaveLength(2);
  });
});
