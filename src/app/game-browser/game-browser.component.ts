import { query } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Game } from '../testing';

@Component({
  selector: 'app-game-browser',
  templateUrl: './game-browser.component.html',
  styleUrls: ['./game-browser.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameBrowserComponent implements OnInit {

  games: Game[]; // the current list of games showing in the table

  pageSize: number = 10; // how many games to show per page
  pageNum: number; // what page number we are at

  nextPageEnabled: boolean = true; // whether or not the next page button is clickable

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.paramsChanged(queryParams);
    });
    // this.fetchGames('');
  }

  paramsChanged(params) {
    console.log(params);
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

    console.log(`query params in string form: ${test.toString()}`);
    this.router.navigate(['/browser/games'], { queryParams: queryParams});
    this.fetchGames(test.toString());
  }

  prevPage() {
    let currentOffset = (this.pageNum - 1) * this.pageSize;
    // console.log('current offset: ' + currentOffset);
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
    // console.log(query);
    console.log(`asked to fetch games, page size of ${this.pageSize}`);
    this.games = []; // clear the list to show we are loading
    this.games = await this.api.getGameList(query);
    if(this.games.length < this.pageSize) { // if we received less games than we show per page
      this.nextPageEnabled = false;
    }
  }

}
