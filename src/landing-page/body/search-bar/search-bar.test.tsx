import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './search-bar';

describe('SearchBar', () => {
    it('can input text in search bar', () => {
        render(<SearchBar />);

        const searchBar = screen.getByTestId(/search-input/)

        // Check has rendered
        expect(searchBar).toBeInTheDocument();

        // Check is selected
        userEvent.click(searchBar)
        expect(searchBar).toHaveFocus()

        // Check text has been entered
        const testString = "testing..."
        userEvent.keyboard(testString)
        expect(searchBar).toHaveValue(testString)
    });
});

