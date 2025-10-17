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

export class PokemonDetails extends PokemonCard {
    flavour: string
    height: number // in meters
    category: string
    weight: number // in kg
    gender: string
    weaknesses: Array<string>
    abilityName: string
    abilityDescription: string
    stats: Array<number>
    pokeballSprite: string

    
    constructor(name: string, id: number, type1: string, type2: string | null, sprite: string,
            flavour: string, height: number, category: string, weight: number, genderRate: number,
            weaknesses: Array<string>, abilityName: string, abilityDescription: string, 
            stats: Array<number>, pokeballSprite: string) {
        super(name, id, type1, type2, sprite)
        this.flavour = flavour
        this.height = height / 10 // Conversion to metres
        this.category = category
        this.weight = weight / 10 // Conversion to kilos

        switch (genderRate) {
            case -1:
                this.gender = "Unknown"
                break;
            case 0:
                this.gender = "Male"
            case 8:
                this.gender = "Female"
            default:
                this.gender = "Male / Female"
                break;
        }

        this.weaknesses = weaknesses
        this.abilityName = abilityName
        this.abilityDescription = abilityDescription
        this.stats = stats.map((stat) => ((stat - 1) / 254) * 100) // converts to score out of 100
        this.pokeballSprite = pokeballSprite
    }
}