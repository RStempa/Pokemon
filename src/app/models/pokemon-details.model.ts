import { Ability } from "./ability.model";
import { Stat } from "./stat.model";

export interface PokemonDetails {
    stats: Stat[];
    types: string[];
    abilities: Ability[];
}