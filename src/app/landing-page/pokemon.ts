export class PokemonCard {
    name: string
    id: number
    type1: string
    type2: string | null
    sprite: string

    constructor(name: string, id: number, type1: string, type2: string | null, sprite: string) {
        this.name = name
        this.id = id
        this.type1 = type1
        this.type2 = type2
        this.sprite = sprite
    }
}