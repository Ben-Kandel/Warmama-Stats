import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Game, PlayerPreview, AdvancedPlayerPreview } from '../interfaces';
import { FormBuilder } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-player-browser',
  templateUrl: './player-browser.component.html',
  styleUrls: ['./player-browser.component.scss']
})
export class PlayerBrowserComponent implements OnInit {

  players: PlayerPreview[];
  selectedPlayer: PlayerPreview;
  selectedPlayerInfo: AdvancedPlayerPreview;

  pageSize = 10; // how many players to show per page
  pageNum: number; // what page number we are at
  nextPageEnabled = true;

  searchForm = this.formBuilder.group({
    player: '',
  });
  

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.paramsChanged(queryParams);
    });
    // this.route.queryParams.pipe(take(1)).subscribe(queryParams => {
    //   this.paramsChanged(queryParams);
    // });
  }

  paramsChanged(params) {
    let offset = (params.offset) ? parseInt(params.offset) : 0;
    let num = Math.floor(offset / this.pageSize) + 1;
    this.pageNum = num; 
    this.onSubmit(params);
  }

  
  onSubmit(params) {
    // code copy and pasted from the game-browser page
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

    this.router.navigate(['/browser/players'], { queryParams: queryParams});
    this.fetchPlayers(test.toString());
  }

  async fetchPlayers(query: string) {
    this.players = [];
    this.players = await this.api.getPlayers(query);
    if(this.players.length < this.pageSize) { // if we received less games than we show per page
      this.nextPageEnabled = false;
    }
  }

  async fetchRecentGames(name: string) {
    this.selectedPlayerInfo = await this.api.getPlayerInfo(name);
  }

  playerClicked(p: PlayerPreview) {
    this.selectedPlayer = p;
    this.fetchRecentGames(p.colored_name);
  }

  navigateToPlayerPage() {
    this.router.navigate(['/player/test']);
  }

  prevPage() {
    let currentOffset = (this.pageNum - 1) * this.pageSize;
    if(currentOffset != 0) {
      this.router.navigate(['/browser/players'], { queryParams : { offset: currentOffset - this.pageSize}, queryParamsHandling : 'merge'});
      this.nextPageEnabled = true;
    }
  }

  nextPage() {
    if(this.nextPageEnabled) {
      let result = this.pageNum * this.pageSize;
      this.router.navigate(['/browser/players'], { queryParams : { offset: result}, queryParamsHandling : 'merge'});   
    }
  }
  
  navigateToGame(game: Game) {
    this.router.navigate([`/game/${game.id}`]);
  }

  keyPressed(event) {
    if(event.keyCode == 13) { // if they pressed the enter key
      this.formSubmitted();
    }
  }

  formSubmitted() {
    let playerName = this.searchForm.value.player;
    if(playerName == '') {
      this.nextPageEnabled = true;
    }
    this.onSubmit({name: playerName});
  }


}
