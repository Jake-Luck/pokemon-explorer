import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/landing-page/landing-page';

describe('LandingPage', () => {
    // Unsure how to split these up? Would be more informant to split them but less performant (can't render in beforeAll)
    it('renders page items correctly', () => {
        render(<LandingPage />);

        const headerText = screen.getByText('Pokémon Browser');
        const headerSubText = screen.getByText('Search and find Pokémon');
        expect(headerText).toBeInTheDocument();
        expect(headerSubText).toBeInTheDocument();

        const headerSeparator = screen.getByTestId(/header-separator/);
        expect(headerSeparator).toBeInTheDocument();

        const bodyHeader = screen.getByText(/Explore Pokémon/);
        expect(bodyHeader).toBeInTheDocument();

        const searchBar = screen.getByTestId(/search-input/);
        const searchButton = screen.getByTestId(/search-button/);
        expect(searchBar).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();

        const previousPage = screen.getByTestId(/back-page/);
        const nextPage = screen.getByTestId(/next-page/);
        expect(previousPage).toBeInTheDocument();
        expect(nextPage).toBeInTheDocument();

        const footerSeparator = screen.getByTestId(/footer-separator/);
        expect(footerSeparator).toBeInTheDocument();

        const footerText = screen.getByText('Thank you for using Pokémon Browser!');
        expect(footerText).toBeInTheDocument();
    })
})