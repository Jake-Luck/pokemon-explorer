import './landing-page.css';
import PokemonList from './pokemon-list/pokemon-list';
import SearchBar from './search-bar/search-bar';
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@/components/ui/icons/akar-icons-arrow-left"
import { ArrowRightIcon } from "@/components/ui/icons/akar-icons-arrow-right";

import { useState } from 'react'

function LandingPage() {
    const initialApiCall = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'

    const pokemonData = useState(null)
    const previousPageCall = useState(null)
    const nextPageCall = useState(null)
    getPokemonBriefData(initialApiCall).then((results) => {
        // pokemonData = results.pokemonData
        // previousPageCall = results.previous
        // nextPageCall = results.next
    })

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
                <PokemonList pokemonData={pokemonData}></PokemonList>
                <div className='pagination'>
                    {/* On click, get pokemon brief data with previous page call*/}
                    <Button id='back-page' data-testid='back-page' disabled={previousPageCall == null}>
                        <ArrowLeftIcon></ArrowLeftIcon>
                        <p>Back</p>
                    </Button>
                    {/* On click, get pokemon brief data with next page call*/}
                    <Button id='next-page' data-testid='next-page' disabled={nextPageCall == null}>
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

function getPokemonBriefData(apiString: string):
    Promise<{
        pokemonData: PokemonBrief[],
        previous: string,
        next: string
    }> {

    const response = await fetch(apiString);
    const responseJson = await response.json();

    const previous = responseJson.previous
    const next = responseJson.next

    // Make api call for each pokemon to get their types
    const pokemonResults = responseJson
    const pokemonData = responseJson.results
}

async function getPokemonTypes(id: number): Promise<{ type1: string, type2: string }> {

}

export default LandingPage