import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ColoredNamePipe } from './colored-name.pipe';

import { TimePlayedPipe } from './time-played.pipe';

import { GamePageComponent } from './game-page/game-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ScoreboardComponent } from './game-page/scoreboard/scoreboard.component';
import { DetailsComponent } from './game-page/details/details.component';
import { BrowserPageComponent } from './browser-page/browser-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { SearchFormComponent } from './browser-page/search-form/search-form.component';
import { GameTableComponent } from './browser-page/game-table/game-table.component';
import { GamePreviewComponent } from './browser-page/game-preview/game-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    ColoredNamePipe,
    TimePlayedPipe,
    GamePageComponent,
    HomePageComponent,
    ScoreboardComponent,
    DetailsComponent,
    BrowserPageComponent,
    AboutPageComponent,
    SearchFormComponent,
    GameTableComponent,
    GamePreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
