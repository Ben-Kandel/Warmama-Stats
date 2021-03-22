import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FullGame, Player, Weapon } from '../testing';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  gameID: string;
  game: FullGame;
  hover: Player;
  waiting = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.updateIDFromURL();
  }

  async fetchNewGame(gameID: string) {
    this.waiting = true;
    let game = await this.apiService.getFullGame(gameID);
    this.waiting = false;
    console.log(game);
    this.game = game;
  }

  updateIDFromURL() {
    this.route.params.subscribe(params => {
      let id = params['gameID'];
      console.log('got new id: ' + id);
      this.fetchNewGame(id);
      this.gameID = id;      
    });
  }

  playerHovered(player: Player) {
    this.hover = player;
  }


}
