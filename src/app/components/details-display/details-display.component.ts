import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonDetails } from 'src/app/models/pokemon-details.model';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-details-display',
  templateUrl: './details-display.component.html',
  styleUrls: ['./details-display.component.css']
})
export class DetailsDisplayComponent {
  @Input() pokemonDetails!: PokemonDetails;
  @Input() pokemon!: Pokemon | undefined;
  @Input() showDetails!: boolean;
  @Output() getShowDetailsUpdate = new EventEmitter<boolean>();

  /**
   * Toggles if modal should be displayed
   */
  toggleModal() {
    this.showDetails = !this.showDetails;
    this.getShowDetailsUpdate.emit(this.showDetails);
  }
}
