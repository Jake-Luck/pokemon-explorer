'use client'

import './landing-page.css';
import PokemonList from './pokemon-list/pokemon-list';
import SearchBar from './search-bar/search-bar';
import { PokemonCard } from "./pokemon";
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@/components/ui/icons/akar-icons-arrow-left"
import { ArrowRightIcon } from "@/components/ui/icons/akar-icons-arrow-right";

import { useEffect, useState } from 'react'

type pokemonListData = { pokemonData: PokemonCard[], previous: string, next: string }
type pokemonCardData = { type1: string, type2: string | null, id: number, sprite: string }

function LandingPage() {
    const initialApiCall = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'

    const [pokemonData, setPokemonData] = useState<PokemonCard[] | null>(null)
    const [previousPageCall, setPreviousPageCall] = useState<string | null>(null)
    const [nextPageCall, setNextPageCall] = useState<string | null>(null)

    function updatePokemonListState(stateInfo: pokemonListData) {
        setPokemonData(stateInfo.pokemonData)
        setPreviousPageCall(stateInfo.previous)
        setNextPageCall(stateInfo.next)
    }

    function setStateNull() {
        setPokemonData(null)
        setPreviousPageCall(null)
        setNextPageCall(null)
    }

    function getListDataAndUpdateState(apiCall: string | null) {
        if (apiCall == null) return
        getPokemonListData(apiCall).then((results) => {
            updatePokemonListState(results)
        })
    }

    // runs when component loaded
    useEffect(() => {
        getListDataAndUpdateState(initialApiCall)
    }, [])

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
                    {/* On click, get pokemon card data with previous page call*/}
                    <Button id='back-page' data-testid='back-page' disabled={previousPageCall == null} onClick={() => { setStateNull(); getListDataAndUpdateState(previousPageCall) }}>
                        <ArrowLeftIcon></ArrowLeftIcon>
                        <p>Back</p>
                    </Button>
                    {/* On click, get pokemon card data with next page call*/}
                    <Button id='next-page' data-testid='next-page' disabled={nextPageCall == null} onClick={() => { setStateNull(); getListDataAndUpdateState(nextPageCall) }}>
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
/**
 * Calls the PokeApi for a list of pokemon names, then calls the api using each pokemon's name to get their info.
 * @param apiString  String to use in fetch request, i.e., 'https://pokeapi.co/api/v2/pokemon'
 * @returns A promise of the pokemon card data and the api strings for next and previous page
 */
async function getPokemonListData(apiString: string): Promise<pokemonListData> {
    console.log("Api called with " + apiString)
    const response = await fetch(apiString);
    const responseJson = await response.json();

    const previous = responseJson.previous
    const next = responseJson.next

    // Make api call for each pokemon to get their types
    const pokemonData: PokemonCard[] = []
    const pokemonResults: Array<{ name: string, url: string }> = responseJson.results
    for (const pokemon of pokemonResults) {
        const pokemonInfo = await getPokemonCardInfo(pokemon.name)
        pokemonData.push(new PokemonCard(pokemon.name, pokemonInfo.id, pokemonInfo.type1, pokemonInfo.type2, pokemonInfo.sprite))
    }

    return { pokemonData, previous, next }
}

/**
 * Calls the Pokeapi using a pokemon's name to get it's types, id and sprite 
 * @param name Pokemon name to use in api call
 * @returns A promise of the pokemon's types, id and sprite
 */
async function getPokemonCardInfo(name: string): Promise<pokemonCardData> {
    const response = await fetch(searchPokemonBaseString + name)
    const responseJson = await response.json();

    const types: Array<{ type: { name: string } }> = responseJson.types
    const type1 = types[0].type.name
    const type2 = types.length > 1 ? types[1].type.name : null
    const id: number = responseJson.id
    const sprite: string = responseJson.sprites.front_default

    return { type1, type2, id, sprite }
}

async function searchPokemon(search: string): Promise<pokemonListData> {
    const response = await fetch(searchPokemonBaseString + search)
    const responseJson = await response.json();

    const previous = responseJson.previous
    const next = responseJson.next
}

export default LandingPage