'use client'

import './landing-page.css';
import PokemonList from './pokemon-list/pokemon-list';
import { PokemonCard } from "./pokemon";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeftIcon } from "@/components/ui/icons/akar-icons-arrow-left"
import { ArrowRightIcon } from "@/components/ui/icons/akar-icons-arrow-right";
import Form from "next/form";

import { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

type pokemonListData = { pokemonData: PokemonCard[] | null, previous: string | null, next: string | null }
type pokemonCardData = { type1: string, type2: string | null, id: number, sprite: string }

const defaultApiCall = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'
function LandingPage() {
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
    function getListDataThenUpdateState(apiCall: string | null): void {
        if (!apiCall) return
        getPokemonListData(apiCall).then((results) => {
            setPokemonList(results)
        })
    }

    /**
     * If search is a valid string then call api with it, otherwise call api with default request.
     * Once api call is done, state is updated with the results
     * @param search Search string to use in api call
     */
    function searchThenUpdateState(searchInput: string | null): void {
        if (!searchInput) {
            getListDataThenUpdateState(defaultApiCall);
            return
        }
        searchPokemon(searchInput).then((results) => {
            setPokemonList(results)
        })
    }

    /**
     * Used by form to submit search data
     * @param formEvent The form event passed on form submit
     */
    function handleSearch(formEvent: React.FormEvent<HTMLFormElement>) {
        formEvent.preventDefault()

        setPokemonListNull()
        const formData = new FormData(formEvent.currentTarget)
        const inputText = (formData.get("input") as string).trim();
        searchThenUpdateState(inputText)

        const params = new URLSearchParams(searchParams)
        params.set('search', inputText)
        router.push(`${pathName}?${params.toString()}`)
    }

    const [pokemonList, setPokemonList] = useState<pokemonListData>({ pokemonData: null, previous: null, next: null })
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    // runs once when component loaded
    useEffect(() => {
        const initialSearch = searchParams.get('search')
        if (initialSearch) {
            searchThenUpdateState(initialSearch)
        }
        else {
            getListDataThenUpdateState(defaultApiCall)
        }
    }, [searchParams])

    return (
        <div className='landing-page flex flex-col gap-[48px] m-0'>
            {/* Hero */}
            <div className='h-[244px] flex flex-col text-center justify-center'>
                <div className='flex flex-col items-center justify-center gap-[8px]'>
                    <h1 className='text-primary text-[60px] leading-[78px] align-bottom margin-0'>Explore Pokémon</h1>
                    <h2 className='text-muted-foreground text-[30px] leading-[36px] align-middle margin-0 tracking-[-0.025em]'>Search and find Pokémon</h2>
                </div>
            </div>

            <hr className='' data-testid='header-separator'></hr>

            {/* Main Page Content */}
            <div className='flex flex-col items-center gap-[48px] pl-[10%] pr-[10%]'>
                {/* Heading and Search */}
                <div className='w-full flex flex-col gap-[16px] items-center justify-between sm sm:flex-row '>
                    <h2 className='text-foreground text-[30px] leading-[36px] tracking-[-0.025em]'>{searchParams.get('search') ? `Search results for '${searchParams.get('search')}'` : 'Explore Pokémon'}</h2>
                    {/* On enter or click, get pokemon card data using inputted name*/}
                    <Form onSubmit={handleSearch} className='h-[40px] flex items-center gap-[12px]'>
                        <Input type='text' placeholder='Find Pokémon' defaultValue={searchParams.get('search') ?? ''} name='input' className='text-muted-foreground w-[251px] font-[400]' data-testid='search-input'></Input>
                        <Button className='font-[500]' data-testid='search-button'>Search</Button>
                    </Form>
                </div>

                <PokemonList pokemonData={pokemonList.pokemonData}></PokemonList>

                {/* pagination */}
                <div className='flex gap-[16px]'>
                    {/* On click, get pokemon card data with previous page call*/}
                    <Button disabled={pokemonList.previous == null} onClick={() => { setPokemonListNull(); getListDataThenUpdateState(pokemonList.previous) }} data-testid='back-page' >
                        <ArrowLeftIcon></ArrowLeftIcon>
                        <p>Back</p>
                    </Button>
                    {/* On click, get pokemon card data with next page call*/}
                    <Button disabled={pokemonList.next == null} onClick={() => { setPokemonListNull(); getListDataThenUpdateState(pokemonList.next) }} data-testid='next-page'>
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
async function getPokemonCardInfo(name: string): Promise<pokemonCardData | false> {
    const response = await fetch(searchPokemonBaseString + name)

    if (!response.ok) return false

    const responseJson = await response.json();

    const types: Array<{ type: { name: string } }> = responseJson.types
    const type1 = types[0].type.name
    const type2 = types.length > 1 ? types[1].type.name : null
    const id: number = responseJson.id
    const sprite: string = responseJson.sprites.front_default

    return { type1, type2, id, sprite }
}

async function searchPokemon(search: string): Promise<pokemonListData> {
    const previous = null
    const next = null

    if (search == '') return getPokemonListData(defaultApiCall);

    const pokemonInfo = await getPokemonCardInfo(search)

    const pokemonData: Array<PokemonCard> = []
    if (pokemonInfo == false) {
        pokemonData.push(new PokemonCard("MissingNo", 0, "Bird", "Normal", "/missingno.png"))
    }
    else {
        pokemonData.push(new PokemonCard(search, pokemonInfo.id, pokemonInfo.type1, pokemonInfo.type2, pokemonInfo.sprite))
    }
    // handle invalid name


    return { pokemonData, previous, next }
}

export default LandingPage