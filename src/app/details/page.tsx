'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PokemonDetails } from "../pokemon";
import { Spinner } from "@/components/ui/spinner";
import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/components/ui/icons/akar-icons-arrow-left";
import Link from "next/link";

function DetailsPage() {
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
    const searchParams = useSearchParams()

   // runs once when component loaded
    useEffect(() => {
        const pokemonName = searchParams.get('pokemonName')
        getPokemonDetails(pokemonName).then((result) => {
            setPokemonDetails(result)
        })
    }, [])
    
    // If details null show spinner else display details 
    const detailsTopSection = pokemonDetails == null ? <></> : getDetailsTopSection(pokemonDetails)
    const detailsBody = pokemonDetails == null ? (
    <div className="flex justify-center items-center h-[calc(100vh-469px)]">
        <Spinner className='size-[76px] stroke-[0.25px]'></Spinner>
    </div>) : getDetailsBody(pokemonDetails)
    return (
        <div className="flex flex-col gap-[48px]">
            {/* Top bar and top section */}
            <div>
                <div className="h-[80px] flex bg-popover items-center">
                    <h3 className="text-[24px] leading-[32px] tracking-[-0.025em] px-[64px]">Pokemon Browser</h3>
                </div>
                {detailsTopSection}
            </div>

            <div className="flex flex-col gap-[40px] px-[140px]">
                {detailsBody}
                <Link href="/">
                    <Button data-testid='next-page'>
                        <ArrowLeftIcon></ArrowLeftIcon>
                        <p>Return Home</p>
                    </Button>
                </Link>

            </div>

            <hr></hr>

            {/* Footer */}
            <div className='flex items-center justify-center h-[244px]'>
                <p className='text-primary text-[18px] leading-[28px]'>Thank you for using Pokémon Browser!</p>
            </div>
        </div>
        
    );
}

function getDetailsTopSection(pokemon: PokemonDetails) {
    return (
        <div>
            <div className="h-[168px] bg-primary/20"></div>
            <div className="flex flex-col items-center gap-[16px] mt-[-51px]">
                <div className="relative size-[208px] rounded-full border-primary-foreground border-[4px] bg-secondary">
                    <Image className="rounded-full pixelated" src={pokemon.sprite} alt={`Image of ${pokemon.name}`} fill style={{ objectFit: "contain" }}></Image>
                </div>
                <div className="flex gap-[12px]">
                    <h2 className="text-primary text-[30px] leading-[36px] tracking-[-0.025em] capitalize">{pokemon.name}</h2>
                    <h2 className="text-muted-foreground text-[30px] leading-[36px] tracking-[-0.025em]">#{String(pokemon.id).padStart(4, '0')}</h2>
                </div>
            </div>
        </div>
    )
}

function getDetailsBody(pokemon: PokemonDetails) {
    return (
        <div className="flex flex-col gap-[40px]">
            <Card className="h-[133px] flex flex-row gap-[28px] items-center px-[48px] py-0 bg-accent">
                <div className="relative size-[100px] border-[1px] rounded-full border-border bg-background">
                    <Image className="rounded-full pixelated" src={pokemon.pokeballSprite} alt={`Image of ${pokemon.pokeballSprite}`} fill style={{ objectFit: "contain" }}></Image>
                </div>
                <p className="text-[20px] font-[400] leading-[28px] text-foreground">{pokemon.flavour}</p>
            </Card>

            <div className="grid grid-cols-3 grid-rows-2 gap-[24px]">
                {/* Height, weight, etc. */}
                <Card className="row-span-2 flex gap-[32px] px-[48px] py-[36px]">
                    <div className="flex flex-col gap-[12px]">
                        <h3 className="text-[24px] leading-[32px] tracking-[-0.025em] text-primary">Height</h3>
                        <p className="text-[20px] text-[400] leading-[28px] text-primary">{pokemon.height}m</p>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        <h3 className="text-[24px] leading-[32px] tracking-[-0.025em] text-primary">Category</h3>
                        <p className="text-[20px] text-[400] leading-[28px] text-primary">{pokemon.category}</p>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        <h3 className="text-[24px] leading-[32px] tracking-[-0.025em] text-primary">Weight</h3>
                        <p className="text-[20px] text-[400] leading-[28px] text-primary">{pokemon.weight}kg</p>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        <h3 className="text-[24px] leading-[32px] tracking-[-0.025em] text-primary">Gender</h3>
                        <p className="text-[20px] text-[400] leading-[28px] text-primary">{pokemon.gender}</p>
                    </div>
                </Card>

                {/* Types and Weaknesses */}
                <Card className="flex gap-[32px] px-[48px] py-[36px]">
                    <div className="flex flex-col gap-[12px]">
                        <h3 className="text-[24px] leading-[32px] tracking-[-0.025em] text-primary">Type{pokemon.type2 != null ? "s" : ""}</h3>
                        <div className='flex gap-[12px] py-[4px]'>
                            <Badge className="capitalize font-[600]">{pokemon.type1}</Badge>
                            {pokemon.type2 != null && <Badge className="capitalize font-[600]">{pokemon.type2}</Badge>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        <h3 className="text-[24px] leading-[32px] tracking-[-0.025em] text-primary">Weaknesses</h3>
                        <div className='flex flex-wrap gap-[12px] py-[4px]'>
                            {pokemon.weaknesses.map((weakness) => (
                                <Badge key={weakness} className="capitalize font-[600]">{weakness}</Badge>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Ability */}
                <Card className="flex gap-[12px] px-[48px] py-[36px]">
                    <h3 className="text-[24px] leading-[32px] tracking-[-0.025em] text-primary">Ability</h3>
                    <div>
                        <p className="text-[20px] font-[400] leading-[28px] text-primary capitalize">{pokemon.abilityName}</p>
                        <p className="text-[20px] font-[300] leading-[28px] text-primary italic">{pokemon.abilityDescription}</p>
                    </div>
                </Card>

                {/* Stats */}
                <Card className="col-span-2 flex gap-[12px] px-[48px] py-[36px]">
                    <div className="flex gap-[24px] items-center">
                        <h4 className="w-[200px] text-[20px] leading-[28px] tracking-[-0.025em]">HP</h4>
                        <Progress className="h-[16px]" value={pokemon.stats[0]}></Progress>
                    </div>
                    <div className="flex gap-[24px] items-center">
                        <h4 className="w-[200px] text-[20px] leading-[28px] tracking-[-0.025em]">Attack</h4>
                        <Progress className="h-[16px]" value={pokemon.stats[1]}></Progress>
                    </div>
                    <div className="flex gap-[24px] items-center">
                        <h4 className="w-[200px] text-[20px] leading-[28px] tracking-[-0.025em]">Defense</h4>
                        <Progress className="h-[16px]" value={pokemon.stats[2]}></Progress>
                    </div>
                    <div className="flex gap-[24px] items-center">
                        <h4 className="w-[200px] text-[20px] leading-[28px] tracking-[-0.025em]">Special Attack</h4>
                        <Progress className="h-[16px]" value={pokemon.stats[3]}></Progress>
                    </div>
                    <div className="flex gap-[24px] items-center">
                        <h4 className="w-[200px] text-[20px] leading-[28px] tracking-[-0.025em]">Special Defense</h4>
                        <Progress className="h-[16px]" value={pokemon.stats[4]}></Progress>
                    </div>
                    <div className="flex gap-[24px] items-center">
                        <h4 className="w-[200px] text-[20px] leading-[28px] tracking-[-0.025em]">Speed</h4>
                        <Progress className="h-[16px]" value={pokemon.stats[5]}></Progress>
                    </div>
                </Card>
            </div>
        </div>
    )
}

async function getPokemonDetails(pokemonName: string | null): Promise<PokemonDetails> {
     // If no search params
    if (!pokemonName) {
        return new PokemonDetails("MissingNo", 0, "Bird", "Normal", "/missingno.png", "", 10, "???", 100, -1, ["Fighting"], "", "", [33, 136, 0, 6, 6, 29], "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png")
    }

    const pokeballPromise = fetch("https://pokeapi.co/api/v2/item-category/standard-balls").then(async (pokeballsResponse) => {
        // Choose a random pokeball in the response's list and get its url
        const pokeballsJson = await pokeballsResponse.json()
        const allPokeballs = pokeballsJson.items
        const randomPokeball = allPokeballs[Math.floor(Math.random() * allPokeballs.length)].url

        // Fetch pokeball's sprite from api
        const spriteResponse = await fetch(randomPokeball)
        const spriteJson = await spriteResponse.json()
        return {pokeballSprite: spriteJson.sprites.default}
    })

    const speciesPromise = fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`).then(async (response) => {
        const json = await response.json()
        const mostRecentEnglishFlavourText = json.flavor_text_entries.reverse().find((entry: {language: {name: string}}) => entry.language.name === "en")
        return { 
            category: json.genera[7].genus.split(" ")[0],
            flavourText: mostRecentEnglishFlavourText.flavor_text,
            genderRate: json.gender_rate,
            id: json.id
        }
    })

    const pokemonPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(async (response) => {
        const json = await response.json()

        const abilityName = json.abilities[0].ability.name
        const abilityPromise = fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`).then(async (abilityResponse) => {
            const abilityJson = await abilityResponse.json()
            const mostRecentEnglishFlavourText = abilityJson.flavor_text_entries.reverse().find((entry: {language: {name: string}}) => entry.language.name === "en")
            return mostRecentEnglishFlavourText.flavor_text
        })
        
        const types: Array<string> = json.types.map((typeId: {type: {name: string}}) => typeId.type.name)
        const typesPromise = Promise.all(types.map(async (type) => {
            const typesResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
            const typesJson =  await typesResponse.json()
            return typesJson.damage_relations.double_damage_from.map((type: {name: string}) => type.name)
        }))

        const [abilityDescription, weaknesses] = await Promise.all([abilityPromise, typesPromise])
        return {
            sprite: json.sprites.front_default,
            height: json.height,
            weight: json.weight,
            stats: json.stats.map((stat: {base_stat: number}) => stat.base_stat),
            abilityName: abilityName,
            abilityDescription: abilityDescription,
            type1: types[0],
            type2: types.length > 1 ? types[1] : null,
            weaknesses: [...new Set(weaknesses.flat())] // Flatten then remove duplicates
        }
    })

    const [pokeball, species, pokemon] = await Promise.all([pokeballPromise, speciesPromise, pokemonPromise])
    const merged = { ...pokeball, ...species, ...pokemon}
    return new PokemonDetails(
        pokemonName,
        merged.id,
        merged.type1,
        merged.type2,
        merged.sprite,
        merged.flavourText,
        merged.height,
        merged.category,
        merged.weight,
        merged.genderRate,
        merged.weaknesses,
        merged.abilityName,
        merged.abilityDescription,
        merged.stats,
        merged.pokeballSprite,
    )
}

export default DetailsPage