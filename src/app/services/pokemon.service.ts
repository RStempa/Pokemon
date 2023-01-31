import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonCatalogService } from './pokemon-catalog.service';
import { Pokemon } from '../models/pokemon.model'; 

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private readonly http: HttpClient,
     private readonly pokemonService: PokemonCatalogService) { }


  public addToCollection(pokemonName: string): void 
  {
    const userId: number = 6;
    const pokemon: Pokemon | undefined = this.pokemonService.pokemonByName(pokemonName);
    
    if(!pokemon)
      return;
    this.http.patch("");
  }
}

