import './body.css';
import { Button } from "@/components/ui/button"
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
                <Button id='back-page' disabled data-testid='back-page'>Back</Button>
                <Button id='next-page' data-testid='next-page'>Next</Button>
            </div>
        </div>
    );
}

export default Body