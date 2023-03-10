import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Output() login: EventEmitter<void> = new EventEmitter();

  /**
   * Constructor takes injected loginservice and userservice
   * @param loginService
   * @param userService
   */
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService
  ) {}

  /**
   * Handles the data from the login form and sends it
   * to the login service.
   * @param loginForm is the ngForm in the html page.
   */
  public loginSubmit(loginForm: NgForm): void {
    const { username } = loginForm.value;

    this.loginService.login(username).subscribe({
      next: (user: User) => {
        this.userService.user = user;
        this.login.emit();
      },
      error: () => {},
    });
  }
}
