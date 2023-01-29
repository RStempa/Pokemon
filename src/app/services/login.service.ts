import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

const { apiUsers, ApiKey } = environment; // destructuring syntax

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private readonly http: HttpClient) { }

  // login
public login(username: string): Observable<User> {
return this.checkUsername(username)
.pipe(
  switchMap((user: User | undefined) => {
    if (user === undefined) {
      return this.createUser(username);
    }
    return of(user);
  }),
  tap((user: User) => {
    StorageUtil.storageSave<User>(StorageKeys.User, user)
  })
  )

}
  // check if user exists
private checkUsername(username: string): Observable<User | undefined> {
  
  return this.http.get<User[]>(`${apiUsers}?username=${username}`)
  .pipe(
    //rxjs operators
    map((response: User[]) => response.pop())
  )
}


  // if !user - create user
  private createUser(username: string): Observable<User> {
    // user
    const user = {
      username,
      pokemon: []
    };
    //headers
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "x-api-key": ApiKey
    });
    // post
    return this.http.post<User>(apiUsers, user, {
      headers
    })
  }

  // if user || created user store user
} // class loginservice
