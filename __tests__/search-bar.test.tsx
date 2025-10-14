import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../src/app/landing-page/search-bar/search-bar';

describe('SearchBar', () => {
    it('can input text in search bar', async () => {
        render(<SearchBar />);
        const user = userEvent.setup();

        const searchBar = screen.getByTestId(/search-input/)

        // Check has rendered
        expect(searchBar).toBeInTheDocument();

        // Check is selected
        await user.click(searchBar)
        expect(searchBar).toHaveFocus()

        // Check text has been entered
        const testString = "testing..."
        await user.keyboard(testString)
        expect(searchBar).toHaveValue(testString)
    });
});

