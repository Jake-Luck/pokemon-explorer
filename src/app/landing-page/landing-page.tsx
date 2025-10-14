import './landing-page.css';
import PokemonList from './pokemon-list/pokemon-list';
import SearchBar from './search-bar/search-bar';
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@/components/ui/icons/akar-icons-arrow-left"
import { ArrowRightIcon } from "@/components/ui/icons/akar-icons-arrow-right";

function LandingPage() {
    return (
        <div className='landing-page'>
            <div className='hero'>
                <div className='hero-text'>
                    <h1>Pokémon Browser</h1>
                    <h2 className='text-muted-foreground'>Search and find Pokémon</h2>
                </div>
            </div>
            <hr data-testid='header-separator'></hr>

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

            <hr data-testid='footer-separator'></hr>
            <div className='footer'>
                <p className='footer-text'>Thank you for using Pokémon Browser!</p>
            </div>
        </div>
    )
}

export default LandingPage