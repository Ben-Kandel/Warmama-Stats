import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';

import { AppComponent } from './app.component';
import { ColoredNamePipe } from './colored-name.pipe';
import { TimePlayedPipe } from './time-played.pipe';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { GameBrowserComponent } from './game-browser/game-browser.component';
import { GbFormComponent } from './game-browser/gb-form/gb-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerBrowserComponent } from './player-browser/player-browser.component';
import {MatMenuModule} from '@angular/material/menu';
import { GamePageComponent } from './game-page/game-page.component';
import { ScoreboardComponent } from './game-page/scoreboard/scoreboard.component';
import { DetailsComponent } from './game-page/details/details.component';
import { StatsListComponent } from './game-page/stats-list/stats-list.component';
import { PlayerPageComponent } from './player-page/player-page.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ColoredNamePipe,
    TimePlayedPipe,
    HomePageComponent,    
    AboutPageComponent,
    GameBrowserComponent,
    GbFormComponent,
    PlayerBrowserComponent,
    GamePageComponent,
    ScoreboardComponent,
    DetailsComponent,
    StatsListComponent,
    PlayerPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatRadioModule,
    MatMenuModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
