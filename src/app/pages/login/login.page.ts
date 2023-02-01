import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage {
  /**
   * Constructor takes injected router sevice.
   * @param router
   */
  constructor(private readonly router: Router) {}

  /**
   * When user is logged in they get redirected to the pokemon page.
   */
  handleLogin(): void {
    this.router.navigateByUrl('/pokemon');
  }
}
