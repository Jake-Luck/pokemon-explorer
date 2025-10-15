'use client'

import './landing-page.css';
import PokemonList from './pokemon-list/pokemon-list';
import SearchBar from './search-bar/search-bar';
import { PokemonCard } from "./pokemon";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeftIcon } from "@/components/ui/icons/akar-icons-arrow-left"
import { ArrowRightIcon } from "@/components/ui/icons/akar-icons-arrow-right";
import Form from "next/form";

import { useEffect, useState } from 'react'

type pokemonListData = { pokemonData: PokemonCard[] | null, previous: string | null, next: string | null }
type pokemonCardData = { type1: string, type2: string | null, id: number, sprite: string }

function LandingPage() {
    const [pokemonList, setPokemonList] = useState<pokemonListData>({ pokemonData: null, previous: null, next: null })

    const updatePokemonListState = (stateInfo: pokemonListData): void => setPokemonList(stateInfo)

    /**
     * Sets all values in pokemon list to null, use before search or next/previous page so page updates to loading state
     */
    function setPokemonListNull() {
        setPokemonList({ pokemonData: null, previous: null, next: null })
    }

    /**
     * Calls get list data then once done, updates state with results
     * @param apiCall String to use in fetch request, i.e., 'https://pokeapi.co/api/v2/pokemon'
     */
    function getListDataAndUpdateState(apiCall: string | null): void {
        if (apiCall == null) return
        getPokemonListData(apiCall).then((results) => {
            updatePokemonListState(results)
        })
    }

    // runs once when component loaded
    useEffect(() => {
        const initialApiCall = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'
        getListDataAndUpdateState(initialApiCall)
    }, [])

    return (
        <div className='landing-page flex flex-col gap-[48px] m-0'>
            {/* Hero */}
            <div className='h-[244px] flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center gap-[8px]'>
                    <h1 className='text-primary text-[60px] leading-[78px] align-bottom margin-0'>Pokémon Browser</h1>
                    <h2 className='text-muted-foreground text-[30px] leading-[36px] align-middle margin-0 tracking-[-0.025em]'>Search and find Pokémon</h2>
                </div>
            </div>

            <hr data-testid='header-separator'></hr>

            {/* Main Page Content */}
            <div className='flex flex-col items-center gap-[48px] pl-[10%] pr-[10%]'>
                {/* Heading and Search */}
                <div className='w-full flex items-center justify-between'>
                    <h2 className='text-foreground text-[30px] leading-[36px] tracking-[-0.025em]'>Explore Pokémon</h2>
                    {/* On enter or click, get pokemon card data using inputted name*/}
                    <Form action={() => { return }} className='h-[40px] flex items-center gap-[12px]'>
                        <Input type='text' placeholder='Find Pokémon' className='text-muted-foreground w-[251px] font-[400]' id='search-input' data-testid='search-input'></Input>
                        <Button className='font-[500]' id='search-button' data-testid='search-button'>Search</Button>
                    </Form>
                </div>

                <PokemonList pokemonData={pokemonList.pokemonData}></PokemonList>

                {/* pagination */}
                <div className='flex gap-[16px]'>
                    {/* On click, get pokemon card data with previous page call*/}
                    <Button id='back-page' data-testid='back-page' disabled={pokemonList.previous == null} onClick={() => { setPokemonListNull(); getListDataAndUpdateState(pokemonList.previous) }}>
                        <ArrowLeftIcon></ArrowLeftIcon>
                        <p>Back</p>
                    </Button>
                    {/* On click, get pokemon card data with next page call*/}
                    <Button id='next-page' data-testid='next-page' disabled={pokemonList.next == null} onClick={() => { setPokemonListNull(); getListDataAndUpdateState(pokemonList.next) }}>
                        <p>Next</p>
                        <ArrowRightIcon></ArrowRightIcon>
                    </Button>
                </div>
            </div>

            <hr data-testid='footer-separator'></hr>

            {/* Footer */}
            <div className='flex items-center justify-center h-[244px]'>
                <p className='text-primary text-[18px] leading-[28px]'>Thank you for using Pokémon Browser!</p>
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

    // handle invalid name

    const types: Array<{ type: { name: string } }> = responseJson.types
    const type1 = types[0].type.name
    const type2 = types.length > 1 ? types[1].type.name : null
    const id: number = responseJson.id
    const sprite: string = responseJson.sprites.front_default

    return { type1, type2, id, sprite }
}

async function searchPokemon(search: string): Promise<pokemonListData> {
    const pokemonInfo = await getPokemonCardInfo(search)

    // handle invalid name

    const pokemonData = [new PokemonCard(search, pokemonInfo.id, pokemonInfo.type1, pokemonInfo.type2, pokemonInfo.sprite)]
    const previous = null
    const next = null

    return { pokemonData, previous, next }
}

export default LandingPage