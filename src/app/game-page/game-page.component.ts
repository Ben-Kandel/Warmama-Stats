import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game, Player } from '../../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  @Input() game: Game;
  hover: Player;
  gameId: string;

  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.updateIdFromURL();
    this.getInitialGame();
  }

  updateIdFromURL() {
    this.route.params.subscribe(params => {
      let id = params['gameId'];
      this.gameId = id;
      console.log('new game id: ' + this.gameId);
      // document.getElementById('id-input').nodeValue = 'this.gameId';
    });
  }

  inputSubmit() {
    console.log('button clicked');
    // this.router.navigateByUrl(this.router.url.replace('gameId', this.gameId));
    this.router.navigateByUrl(`/game/${this.gameId}`);
    this.updateGame();
  }

  async updateGame() {
    this.game = await this.gameService.getGame(this.gameId);
  }

  async getInitialGame() {
    this.game = await this.gameService.getGame(this.gameId);
  }

  playerHovered(player: Player) {
    this.hover = player;
  }

}
