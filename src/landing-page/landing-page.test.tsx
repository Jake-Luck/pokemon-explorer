import { render, screen } from '@testing-library/react';
import LandingPage from './landing-page';

test('renders header text', () => {
    render(<LandingPage />);
    const headerText = screen.getByText(/Pokémon Browser/);
    expect(headerText).toBeInTheDocument();
});