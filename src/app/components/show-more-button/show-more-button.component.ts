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

  /**
   * Handles when the user tries to view details on the pokemon
   */
  onShowMoreClick(): void 
  {
    this.pokemonCatalogService.findPokemonDetails(this.pokemonName);
    this.pokemon = this.pokemonCatalogService.pokemonByName(this.pokemonName);
    this.pokemonDetails = this.pokemonCatalogService.pokemonDetails;
    this.showDetails = true;
  }

  /**
   * Toggles the modal display.
   * @param event 
   */
  toggle(event: boolean) {
    this.showDetails = event;
  }
}