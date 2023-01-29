import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokemonCatalogPage } from "./pages/pokemon-catalog/pokemon-catalog.page";
import { LoginPage } from "./pages/login/login.page";
import { ProfilePage } from "./pages/profile/profile.page";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/login"
    },
    {
        path: "login",
        component: LoginPage
    },
    {
        path: "pokemon",
        component: PokemonCatalogPage
    },
    {
        path: "profile",
        component: ProfilePage
    }
] 

@NgModule({
    imports: [
        RouterModule.forRoot(routes) 
     ],
     exports: [
        RouterModule
     ]
})
export class AppRoutingModule {
    
}