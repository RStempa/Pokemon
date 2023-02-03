import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-release-pokemon-button',
  templateUrl: './release-pokemon-button.component.html',
  styleUrls: ['./release-pokemon-button.component.css']
})
export class ReleasePokemonButtonComponent {

  @Input() pokemonName: string = "";

  constructor(private readonly pokemonService: PokemonService,){}
  /**
   * Handles when the user attempts to release a pokemon
   */
  onReleaseClick(): void{
    this.pokemonService.removeFromCollection(this.pokemonName).subscribe({
      next: (response: User) => {
      },
      error: (error: HttpErrorResponse) => 
      {
        console.log(error.message);
      }
    });
  }
}
