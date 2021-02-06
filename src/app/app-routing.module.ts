import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';

import { AppComponent } from './app.component';
import { BrowserPageComponent } from './browser-page/browser-page.component';
import { GameBrowserComponent } from './game-browser/game-browser.component';
import { GamePageComponent } from './game-page/game-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'game', component: GamePageComponent},
  { path: 'game/:gameId', component: GamePageComponent},
  { path: 'browser', component: BrowserPageComponent},
  { path: 'browser/games', component: GameBrowserComponent},
  { path: 'about', component: AboutPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
