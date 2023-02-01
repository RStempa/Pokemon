import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonCatalogService } from './pokemon-catalog.service';
import { Pokemon } from '../models/pokemon.model'; 
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';

const {ApiKey, apiUsers} = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private readonly http: HttpClient,
     private readonly pokemonService: PokemonCatalogService,
     private readonly userService: UserService) { }



    public removeFromCollection(pokemonName: string): Observable<User>
    {
      if(!this.userService.user)
        throw new Error("");
      const user: User = this.userService.user;
      const headers = new HttpHeaders({
        'content-type': 'application/json',
        'x-api-key': ApiKey
      })

      const pokemonToRemove = user.pokemon.find((value) => value.name === pokemonName)
      if(!pokemonToRemove)
        throw new Error("");
      let newPokemon = [...user.pokemon];
      newPokemon.splice(user.pokemon.indexOf(pokemonToRemove) ,1);
      return this.http.patch<User>(`${apiUsers}/${user.id}`, {
        pokemon: newPokemon
      },
      {
        headers
      })
      .pipe(
        tap((updatedUser: User) => {
          this.userService.user = updatedUser;
        })
      );
    }

  public addToCollection(pokemonName: string): Observable<User> 
  {
    if(!this.userService.user)
      throw new Error("");
    const user: User = this.userService.user;
    const pokemon: Pokemon | undefined = this.pokemonService.pokemonByName(pokemonName);
    
    if(!pokemon)
      throw new Error("");
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': ApiKey
    })
    return this.http.patch<User>(`${apiUsers}/${user.id}`, {
      pokemon: [...user.pokemon, pokemon]
    },
    {
      headers
    })
    .pipe(
      tap((updatedUser: User) => {
        this.userService.user = updatedUser;
      })
    );
  }
}

 