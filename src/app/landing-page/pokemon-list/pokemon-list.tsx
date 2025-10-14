import './pokemon-list.css';
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from 'next/image';
import { JSX } from 'react';


interface PokemonListProps {
    pokemonData: PokemonBrief[] | null
}
function PokemonList({ pokemonData }: PokemonListProps) {
    const pokemonContents = pokemonData == null ? <Spinner></Spinner> : generatePokemonList(pokemonData)

    return (
        <div className='pokemon-list'>
            {pokemonContents}
        </div>
    );
}

function generatePokemonList(pokemonData: PokemonBrief[] | null) {
    return (
        <div className='pokemon-grid'>
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