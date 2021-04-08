import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Game, PlayerPreview } from '../interfaces';

@Component({
  selector: 'app-game-browser',
  templateUrl: './game-browser.component.html',
  styleUrls: ['./game-browser.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameBrowserComponent implements OnInit {

  games: Game[]; // the current list of games showing in the table
  hover: Game;
  players: PlayerPreview[];

  pageSize = 10; // how many games to show per page
  pageNum: number; // what page number we are at

  nextPageEnabled = true; // whether or not the next page button is clickable

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.paramsChanged(queryParams);
    });
    // this.fetchGames('');
  }

  paramsChanged(params) {
    let offset = (params.offset) ? parseInt(params.offset) : 0;
    let num = Math.floor(offset / this.pageSize) + 1;
    this.pageNum = num; 
    this.onSubmit(params);
  }


  onSubmit(params) {
    // we need to collect only the fields that were filled out
    let queryParams = {};
    for(let x of Object.keys(params)){
      if(params[x]) {
        queryParams[x] = params[x];
      }
    }

    let test = new URLSearchParams();
    for(let x of Object.keys(params)){      
      if(params[x]) {
        test.append(x, params[x]);
      }
    }
    this.router.navigate(['/browser/games'], { queryParams: queryParams});
    this.fetchGames(test.toString());
  }

  prevPage() {
    let currentOffset = (this.pageNum - 1) * this.pageSize;
    if(currentOffset != 0) {
      this.router.navigate(['/browser/games'], { queryParams : { offset: currentOffset - this.pageSize}, queryParamsHandling : 'merge'});
      this.nextPageEnabled = true;
    }
  }

  nextPage() {
    if(this.nextPageEnabled) {
      let result = this.pageNum * this.pageSize;
      this.router.navigate(['/browser/games'], { queryParams : { offset: result}, queryParamsHandling : 'merge'});   
    }
  }

  async fetchGames(query) {
    this.nextPageEnabled = true; // reset this
    // this.games = []; // clear the list to show we are loading
    this.games = await this.api.getGameList(query);
    if(this.games.length < this.pageSize) { // if we received less games than we show per page
      this.nextPageEnabled = false;
    }
  }

  navigateToGame(game: Game) {
    this.router.navigate([`/game/${game.id}`]);
  }

  gameHovered(game: Game) {
    // this is where we fetch the list of players so we can show it in the hover preview
    this.hover = game;
    if(game) {
      this.fetchPlayersForPreview(game.id);
    }
  }

  async fetchPlayersForPreview(game_id: number) {
    this.players = await this.api.getPlayersInGame(game_id);
  }

}
