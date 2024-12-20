import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

const HOME_VIEW_TEST_ID = 'home-view';

jest.mock('@/views', () => ({
  HomeView: () => <div data-testid={HOME_VIEW_TEST_ID} />,
}));

describe('Home Page', () => {
  it('should render home view', () => {
    render(<Home />);
    const view = screen.getByTestId(HOME_VIEW_TEST_ID);
    expect(view).toBeInTheDocument();
  });
});
