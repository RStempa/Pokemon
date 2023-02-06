import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const { apiUsers, ApiKey } = environment; // destructuring syntax

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  /**
   * The login function. Creates a new user if undefined.
   * @param username
   * @returns A user.
   */
  public login(username: string): Observable<User> {
    return this.checkUsername(username).pipe(
      switchMap((user: User | undefined) => {
        if (user === undefined) {
          return this.createUser(username);
        }
        return of(user);
      })
    );
  }
  /**
   * Check if user exists on the backend.
   * @param username
   * @returns The user if it exists or undefined.
   */
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiUsers}?username=${username}`).pipe(
      //rxjs operators
      map((response: User[]) => response.pop())
    );
  }

  /**
   * If there is no such user they are created and
   * stored on the backend.
   * @param username
   * @returns the created user.
   */
  private createUser(username: string): Observable<User> {
    // user
    const user = {
      username,
      pokemon: [],
    };
    //headers
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'x-api-key': ApiKey,
    });
    // post
    return this.http.post<User>(apiUsers, user, {
      headers,
    });
  }
}
