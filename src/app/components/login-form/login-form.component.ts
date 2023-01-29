import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(private readonly loginService: LoginService) {}
    
    public loginSubmit(loginForm: NgForm): void {

      // username
      const { username } = loginForm.value;

      //console.log(username);

      //return;

      this.loginService.login(username)
      .subscribe({
        next: (uder: User) => {

        },
        error: () => {
          
        }
      })
    }


  }

