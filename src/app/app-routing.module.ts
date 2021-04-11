import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';

import { AppComponent } from './app.component';
import { GameBrowserComponent } from './game-browser/game-browser.component';
import { GamePageComponent } from './game-page/game-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PlayerBrowserComponent } from './player-browser/player-browser.component';
import { PlayerPageComponent } from './player-page/player-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'browser/games', component: GameBrowserComponent},
  { path: 'browser/players', component: PlayerBrowserComponent},
  { path: 'game/:gameID', component: GamePageComponent},
  { path: 'player/:playerName', component: PlayerPageComponent},
  { path: 'about', component: AboutPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
