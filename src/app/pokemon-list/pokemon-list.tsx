import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PokemonCard } from '../pokemon';
import Image from 'next/image';
import Link from "next/link";


interface PokemonListProps {
    pokemonData: PokemonCard[] | null
}
function PokemonList({ pokemonData }: PokemonListProps) {
    const pokemonContents = pokemonData == null ? <Spinner className='size-[76px]'></Spinner> : generatePokemonList(pokemonData)

    return (
        <div className='w-full inline flex items-center justify-items-center'>
            {pokemonContents}
        </div>
    );
}

function generatePokemonList(pokemonData: PokemonCard[]) {
    return (
        <div className='grid grid-cols [grid-template-columns:repeat(auto-fill,_266px)] gap-y-[60px] size-full justify-center sm:justify-between'>
            {pokemonData.map((pokemon) => (
                <Link key={pokemon.id} href={{
                    pathname: '/details',
                    query: { pokemonName: pokemon.name },
                    }}
                >
                <Card className='size-fit p-0 gap-0 rounded-[8px]'>
                    <div className="relative w-[266px] h-[224px]">
                        <Image className='bg-secondary rounded-t-[8px] pixelated ' src={pokemon.sprite} alt={`Image of ${pokemon.name}`} fill style={{ objectFit: "contain" }}></Image>
                    </div>
                    <CardContent className='flex flex-col w-[266px] h-[167px] p-0 rounded-b-[8px]'>
                        <CardHeader className='size-fit flex flex-col p-[24px] gap-[6px]'>
                            <h3 className='text-foreground font-[24px] leading-[32px] tracking-[-0.025em] capitalize'>{pokemon.name}</h3>
                            <p className='text-muted-foreground font-[16px] leading-[20px]'>#{String(pokemon.id).padStart(4, '0')}</p>
                        </CardHeader>
                        <div className='flex gap-[12px] pt-[8px] px-[24px] pb-[28px]'>
                            <Badge className="capitalize font-[600]">{pokemon.type1}</Badge>
                            {pokemon.type2 != null && <Badge className="capitalize font-[600]">{pokemon.type2}</Badge>}
                        </div>
                    </CardContent>
                </Card>
                </Link>
            ))}
        </div>
    )
}

export default PokemonList