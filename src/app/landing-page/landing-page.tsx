'use client'

import './landing-page.css';
import PokemonList from './pokemon-list/pokemon-list';
import SearchBar from './search-bar/search-bar';
import { PokemonBrief } from "./pokemon";
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@/components/ui/icons/akar-icons-arrow-left"
import { ArrowRightIcon } from "@/components/ui/icons/akar-icons-arrow-right";

import { useState } from 'react'

function LandingPage() {
    const initialApiCall = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'

    const [pokemonData, setPokemonData] = useState<PokemonBrief[] | null>(null)
    const [previousPageCall, setPreviousPageCall] = useState<string | null>(null)
    const [nextPageCall, setNextPageCall] = useState<string | null>(null)
    getPokemonBriefData(initialApiCall).then((results) => {
        setPokemonData(results.pokemonData)
        setPreviousPageCall(results.previous)
        setNextPageCall(results.next)
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


const searchPokemonBaseString = 'https://pokeapi.co/api/v2/pokemon/'
type pokemonBriefApiReturn = Promise<{ pokemonData: PokemonBrief[], previous: string, next: string }>
async function getPokemonBriefData(apiString: string): pokemonBriefApiReturn {
    const response = await fetch(apiString);
    const responseJson = await response.json();

    const previous = responseJson.previous
    const next = responseJson.next

    // Make api call for each pokemon to get their types
    const pokemonData: PokemonBrief[] = []
    const pokemonResults: Array<{ name: string, url: string }> = responseJson.results
    for (const pokemon of pokemonResults) {
        const pokemonInfo = await getPokemonBriefInfo(pokemon.name)
        pokemonData.push(new PokemonBrief(pokemon.name, pokemonInfo.id, pokemonInfo.type1, pokemonInfo.type2, pokemonInfo.sprite))
    }

    return { pokemonData, previous, next }
}

async function getPokemonBriefInfo(name: string): Promise<{ type1: string, type2: string | null, id: number, sprite: string }> {
    const response = await fetch(searchPokemonBaseString + name)
    const responseJson = await response.json();

    const types: Array<{ type: { name: string } }> = responseJson.types
    const type1 = types[0].type.name
    const type2 = types.length > 1 ? types[1].type.name : null
    const id: number = responseJson.id
    const sprite: string = responseJson.sprites.front_default

    return { type1, type2, id, sprite }
}

async function searchPokemon(search: string): pokemonBriefApiReturn {
    const response = await fetch(searchPokemonBaseString + search)
    const responseJson = await response.json();

    const previous = responseJson.previous
    const next = responseJson.next
}

export default LandingPage