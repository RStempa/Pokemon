import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})

export class CatchPokemonButtonComponent implements OnInit {

  public isCaught: boolean = false;
  @Input() pokemonName: string = "";
  
  constructor(private readonly pokemonService: PokemonService,
    private readonly userService: UserService) {}

    /**
     * Checks if the pokemon is caught
     */
  ngOnInit (): void {
    this.isCaught = this.userService.inCollection(this.pokemonName);
  }

  /**
   * Handles when the user attempts to catch a pokemon
   */
  onCatchClick(): void{
    this.pokemonService.addToCollection(this.pokemonName).subscribe({
      next: (response: User) => {
        this.isCaught = true;
      },
      error: (error: HttpErrorResponse) => 
      {
        console.log(error.message);
      }
    });
  }
}
