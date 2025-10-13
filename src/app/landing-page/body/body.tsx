import './body.scss';
import PokemonList from './pokemon-list/pokemon-list';
import SearchBar from './search-bar/search-bar';

function Body() {
    return (
        <div className='body'>
            <div className='sub-heading-and-search'>
                <h2>Explore Pokémon</h2>
                <SearchBar></SearchBar>
            </div>
            <PokemonList></PokemonList>
            <div className='pagination'>
                <button id='back-page' disabled data-testid='back-page'>
                    <svg width="16" height="16" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.457.71a.033.033 0 0 1 0 .047L2.1 4.113l-.403.854h10.136c.018 0 .033.015.033.033a.033.033 0 0 1-.033.033H1.698l.403.853 3.356 3.357a.033.033 0 0 1 0 .047.033.033 0 0 1-.047 0L1.143 5.023A.03.03 0 0 1 1.133 5l.01-.024L5.41.71A.03.03 0 0 1 5.433.7Z" fill="#09090b" stroke="#fafafa" /></svg>
                    <p>Back</p>
                </button>
                <button id='next-page' data-testid='next-page'>
                    <p>Next</p>
                    <svg width="16" height="16" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.543.71a.033.033 0 0 0 0 .047L10.9 4.113l.403.854H1.166A.034.034 0 0 0 1.133 5c0 .018.015.033.033.033h10.136l-.403.853-3.356 3.357a.033.033 0 0 0 0 .047.033.033 0 0 0 .047 0l4.267-4.267a.03.03 0 0 0 .01-.023l-.01-.024L7.59.71A.03.03 0 0 0 7.567.7Z" fill="#09090b" stroke="#fafafa" /></svg>
                </button>
            </div>
        </div>
    );
}

export default Body