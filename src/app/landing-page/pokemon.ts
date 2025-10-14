class PokemonBrief {
    name: string
    id: number
    type1: string
    type2: string | null

    constructor(name: string, id: number, type1: string, type2: string | null) {
        this.name = name
        this.id = id
        this.type1 = type1
        this.type2 = type2
    }
}