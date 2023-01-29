import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCatalogPage } from './pages/pokemon-catalog/pokemon-catalog.page';
import { ProfilePage } from './pages/profile/profile.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import{  HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

// Decorator
@NgModule({ // components
  declarations: [
    AppComponent,
    LoginPage,
    PokemonCatalogPage,
    ProfilePage,
    LoginFormComponent
  ],
  imports: [ // modules
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
