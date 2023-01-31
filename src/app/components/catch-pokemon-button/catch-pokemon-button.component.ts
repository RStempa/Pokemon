import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent {

  @Input() pokemonName: string = "";
  constructor(private readonly pokemonService: PokemonService) {}
  onCatchClick(): void{
    console.log(this.pokemonName);
    this.pokemonService.addToCollection(this.pokemonName).subscribe({
      next: (response: User) => {
        console.log("NEXT", response);
      },
      error: (error: HttpErrorResponse) => 
      {
        console.log(error.message);
      }
    });
  }
}
