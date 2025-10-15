import './pokemon-list.css';
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from 'next/image';
import { JSX } from 'react';
import { PokemonCard } from '../pokemon';


interface PokemonListProps {
    pokemonData: PokemonCard[] | null
}
function PokemonList({ pokemonData }: PokemonListProps) {
    const pokemonContents = pokemonData == null ? <Spinner className='size-[76px]'></Spinner> : generatePokemonList(pokemonData)

    return (
        <div className='pokemon-list inline flex items-center justify-items-center'>
            {pokemonContents}
        </div>
    );
}

function generatePokemonList(pokemonData: PokemonCard[] | null) {
    return (
        <div className='grid grid-cols-4 grid-rows-3 size-full items-start justify-between justify-items-center'>
            {pokemonData?.map((pokemon) => (

                <Card className='card' key={pokemon.id}>
                    <Image className='image background-secondary' src={pokemon.sprite} alt='Image of {pokemon.name}' width={266} height={224}></Image>
                    <CardContent>
                        <CardHeader>
                            <h3 className='pokemon-name'>{pokemon.name}</h3>
                            <p className='pokemon-id'>{pokemon.id}</p>
                            <div className='pokemon-types'>
                                <Badge>{pokemon.type1}</Badge>
                                {pokemon.type2 != null && <Badge>{pokemon.type2}</Badge>}
                            </div>
                        </CardHeader>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default PokemonList