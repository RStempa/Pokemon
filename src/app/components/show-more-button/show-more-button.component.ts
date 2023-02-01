import { Component, Input } from '@angular/core';
import { PokemonDetails } from 'src/app/models/pokemon-details.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogService } from 'src/app/services/pokemon-catalog.service';

@Component({
  selector: 'app-show-more-button',
  templateUrl: './show-more-button.component.html',
  styleUrls: ['./show-more-button.component.css']
})
export class ShowMoreButtonComponent {

  @Input() pokemonName!: string;
  showDetails: boolean = false;
  pokemonDetails: PokemonDetails = {
    stats: [],
    abilities: [],
    types: []
  }
  pokemon: Pokemon | undefined = {
    id: "",
    name: "",
    avatar: "",
    url: ""
  };
  constructor(private readonly pokemonCatalogService: PokemonCatalogService) {}

  onShowMoreClick(): void 
  {
    this.pokemonCatalogService.findPokemonDetails(this.pokemonName);
    this.pokemon = this.pokemonCatalogService.pokemonByName(this.pokemonName);
    this.pokemonDetails = this.pokemonCatalogService.pokemonDetails;
    console.log(this.showDetails);
    this.showDetails = true;
    console.log(this.pokemonDetails.abilities);
  }

  toggle(event: boolean) {
    this.showDetails = event;
  }
}