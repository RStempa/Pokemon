import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent {

  @Input() pokemonName: string = "";

  onCatchClick(): void{
    console.log(this.pokemonName);
  }
}
