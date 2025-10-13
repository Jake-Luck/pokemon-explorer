import './body.css';
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@/components/ui/icons/akar-icons-arrow-left"
import { ArrowRightIcon } from "@/components/ui/icons/akar-icons-arrow-right";
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
                <Button id='back-page' disabled data-testid='back-page'>
                    <ArrowLeftIcon></ArrowLeftIcon>
                    <p>Back</p>
                </Button>
                <Button id='next-page' data-testid='next-page'>
                    <p>Next</p>
                    <ArrowRightIcon></ArrowRightIcon>
                </Button>
            </div>
        </div>
    );
}

export default Body