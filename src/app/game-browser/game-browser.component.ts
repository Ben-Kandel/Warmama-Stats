import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../api.service';
import { Game } from '../testing';

@Component({
  selector: 'app-game-browser',
  templateUrl: './game-browser.component.html',
  styleUrls: ['./game-browser.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameBrowserComponent implements OnInit {

  games: Game[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetchGames();
  }

  nextPage() {
    console.log('clicked next page');
  }

  async fetchGames() {
    this.games = await this.api.getGameList('test');
  }

}
