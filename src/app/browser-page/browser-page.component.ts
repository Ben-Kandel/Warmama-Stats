import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { Game } from '../../game';


@Component({
  selector: 'app-browser-page',
  templateUrl: './browser-page.component.html',
  styleUrls: ['./browser-page.component.scss'],
  
})
export class BrowserPageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private gameService: GameService) { }

  games: Game[];
  pageSize: number;
  pageIndex: number;

  hoveredGame: Game;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paramsUpdated(params);
    });
  }

  onSubmit(params) {
    // we need to collect only the fields that were filled out
    let queryParams = {};
    for(let x of Object.keys(params)){
      if(params[x]) {
        // console.log(`${x}: ${params[x]}`);
        if(x == 'player') { //we need to turn our player names into lowercase 
          queryParams[x] = params[x].toLowerCase();
        }else {
          queryParams[x] = params[x];
        }
      }
    }
    this.router.navigate(['/browser'], { queryParams: queryParams});
  }

  onClick(game: Game) {
    // console.log('clicked on game '+ game.id);
    this.router.navigateByUrl(`/game/${game.id}`);
  }

  onHover(game: Game) {
    this.hoveredGame = game;
  }

  paramsUpdated(params) {
    let test = new URLSearchParams();
    for(let x of Object.keys(params)){      
      if(params[x]) {
        test.append(x, params[x]);
      }
    }
    // console.log(`params updated: ${test.toString()}`);
    this.getTestData(test.toString());
  }

  private async getTestData(query: string) {
    this.games = await this.gameService.testGetGames(query);
  }

}
