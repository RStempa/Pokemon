import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogService {

  private _pokemon: Pokemon[] = [];

  get pokemon(): Pokemon[] {
    return this._pokemon;
  }

  constructor(private readonly http: HttpClient) { }

  public findAllPokemon(): void {
    this.http.get<Pokemon[]>("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .subscribe({
      next: (pokemon: any) => {
        this._pokemon = pokemon.results;
        this.formatUrlStrings();
      },
      error: (error: HttpErrorResponse) => {
          console.log(error.message);
      }
    })
  }

  public formatUrlStrings(): void{
    for(let pokemon of this._pokemon){
      let urlArray = pokemon.url.split("/");
      pokemon.avatar = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + urlArray[urlArray.length - 2] + ".png";
      pokemon.id = urlArray[urlArray.length - 2];
    }
  }

  public pokemonByName(name: string): Pokemon | undefined {
    return this._pokemon.find((pokemon: Pokemon) => pokemon.name === name);
  }
}
