import { Component, OnInit } from '@angular/core';
import { PokemonCatalogService } from 'src/app/services/pokemon-catalog.service';
import {Pokemon} from "../../models/pokemon.model"

@Component({
  selector: 'app-pokemon-catalog',
  templateUrl: './pokemon-catalog.page.html',
  styleUrls: ['./pokemon-catalog.page.css']
})
export class PokemonCatalogPage implements OnInit {
  
  get pokemon(): Pokemon[]{
    if(!this.pokemonCatalogService.pokemon)
      throw new Error("Pokemon undefined");
    return this.pokemonCatalogService.pokemon;
  }

  constructor(private readonly pokemonCatalogService: PokemonCatalogService){}
  
  ngOnInit(): void {
      this.pokemonCatalogService.findAllPokemon();
  }
}
