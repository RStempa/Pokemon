import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogService {

  private _pokemon: Pokemon[] | undefined = [];

  get pokemon(): Pokemon[] | undefined {
    return this._pokemon;
  }

  constructor(private readonly http: HttpClient) { }

  public findAllPokemon(): void {
    this._pokemon = StorageUtil.storageRead<Pokemon[]>("pokemon");
    if(!this._pokemon)
      this.http.get<Pokemon[]>("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .subscribe({
        next: (pokemon: any) => {
          this._pokemon = pokemon.results;
          StorageUtil.storageSave("pokemon", this._pokemon);
          this.formatUrlStrings();
        },
        error: (error: HttpErrorResponse) => {
            console.log(error.message);
        }
      })
    else
      this.formatUrlStrings();
  }

  public formatUrlStrings(): void{
    if(!this._pokemon)
      throw new Error("Pokemon undefined");
    for(let pokemon of this._pokemon){
      let urlArray = pokemon.url.split("/");
      pokemon.avatar = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + urlArray[urlArray.length - 2] + ".png";
      pokemon.id = urlArray[urlArray.length - 2];
    }
  }

  public pokemonByName(name: string): Pokemon | undefined {
    if(!this._pokemon)
      return undefined;

    return this._pokemon.find((pokemon: Pokemon) => pokemon.name === name);
  }
}
