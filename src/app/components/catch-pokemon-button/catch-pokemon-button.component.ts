import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent {

  @Input() pokemonId: string = "";

  onCatchClick(): void{
    console.log(this.pokemonId);
  }
}
