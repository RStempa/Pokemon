import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: User | undefined;

  /**
   * Getter for private field _user
   */
  public get user(): User | undefined {
    return this._user;
  }

  /**
   * Setter for private field _user
   */
  public set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!);
    this._user = user;
  }

  public inCollection(pokemonName: string): boolean {
    if(this._user)
    {
      return Boolean(this._user.pokemon.find((pokemon: Pokemon) => { return pokemon.name === pokemonName}))

    }
    return false;
  }

  constructor() {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
  }
}
