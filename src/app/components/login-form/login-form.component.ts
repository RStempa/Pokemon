import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    //private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly userService: UserService
  ) {}

  public loginSubmit(loginForm: NgForm): void {
    // username
    const { username } = loginForm.value;

    // kolla så username inte är tomt

    //console.log(username);

    //return;

    this.loginService.login(username).subscribe({
      next: (user: User) => {
        //this.router.navigateByUrl("/pokemon")
        this.userService.user = user;
        console.log(user);
        this.login.emit();
      },
      error: () => {},
    });
  }
}
