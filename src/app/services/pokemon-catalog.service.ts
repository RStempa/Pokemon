import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonDetails } from '../models/pokemon-details.model';
import { Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.util';

const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root',
})
export class PokemonCatalogService {
  private _loading = false;
  private _pokemon: Pokemon[] | undefined = [];
  private _pokemonDetails: PokemonDetails = {
    stats: [],
    abilities: [],
    types: [],
  };

  /**
   * @returns Full pokemon list.
   */
  get pokemon(): Pokemon[] | undefined {
    return this._pokemon;
  }

  /**
   * @returns Details on a pokemon
   */
  get pokemonDetails(): PokemonDetails {
    return this._pokemonDetails;
  }

  constructor(private readonly http: HttpClient) {}

  /**
   * Finds all pokemon in the api
   * @returns 
   */
  public findAllPokemon(): void {

    if(this._pokemon)
      if(this._pokemon?.length > 0 || this._loading)
        return;

    this._pokemon = StorageUtil.storageRead<Pokemon[]>('pokemon');

    if (!this._pokemon)
    {
      this._loading = true;
      this.http
      .get<Pokemon[]>(`${apiPokemon}?limit=100000&offset=0`)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemon: any) => {
          this._pokemon = pokemon.results;
          StorageUtil.storageSave('pokemon', this._pokemon);
          this.formatUrlStrings();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
    });
    }
      
    else this.formatUrlStrings();
  }

  /**
   * Finds details on one pokemon
   * @param pokemonName Pokemon to find details for
   */
  public findPokemonDetails(pokemonName: string): void {
    this.http.get<PokemonDetails>(`${apiPokemon}/${pokemonName}`).subscribe({
      next: (pokemon: any) => {
        this._pokemonDetails.stats = [];
        pokemon.stats.forEach((element: any) => {
          this._pokemonDetails.stats.push({
            base_stat: element.base_stat,
            name: element.stat.name,
          });
        });
        this._pokemonDetails.abilities = [];
        pokemon.abilities.forEach((element: any) => {
          console.log(element.ability.url);
          this.findPokemonAbility(element.ability.url);
        });
        this._pokemonDetails.types = [];
        pokemon.types.forEach((element: any) => {
          this._pokemonDetails.types.push(element.type.name);
        });
        console.log(this._pokemonDetails.abilities);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  /**
   * Finds ability details
   * @param url Ability url
   */
  public findPokemonAbility(url: string): void {
    this.http.get<any>(`${url}`).subscribe({
      next: (ability: any) => {
        if (ability.effect_entries[0].language.name === 'en') {
          this._pokemonDetails.abilities.push({
            name: ability.name,
            short_effect: ability.effect_entries[0].short_effect,
          });
        } else {
          this._pokemonDetails.abilities.push({
            name: ability.name,
            short_effect: ability.effect_entries[1].short_effect,
          });
        }
      },
    });
  }

  /**
   * Formats the pokemon object for local objects
   */
  public formatUrlStrings(): void {
    if (!this._pokemon) throw new Error('Pokemon undefined');
    for (let pokemon of this._pokemon) {
      let urlArray = pokemon.url.split('/');
      pokemon.avatar =
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
        urlArray[urlArray.length - 2] +
        '.png';
      pokemon.id = urlArray[urlArray.length - 2];
    }
  }

  /**
   * Finds a locally saved pokemon by it's name.
   * @param name Pokemon to find 
   * @returns Found pokemon
   */
  public pokemonByName(name: string): Pokemon | undefined {
    if (!this._pokemon) return undefined;

    return this._pokemon.find((pokemon: Pokemon) => pokemon.name === name);
  }
}
