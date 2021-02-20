import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Game, PlayerPreview, AdvancedPlayerPreview } from '../testing';

@Component({
  selector: 'app-player-browser',
  templateUrl: './player-browser.component.html',
  styleUrls: ['./player-browser.component.scss']
})
export class PlayerBrowserComponent implements OnInit {

  players: PlayerPreview[];
  selectedPlayer: PlayerPreview;
  selectedPlayerInfo: AdvancedPlayerPreview;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.initialFetch();
  }

  async initialFetch() {
    this.players = await this.api.getAllPlayers();
  }

  async fetchRecentGames(name: string) {
    // let test = await this.api.getPlayerInfo(name);
    // console.log('got:');
    // console.log(test);
    this.selectedPlayerInfo = await this.api.getPlayerInfo(name);
  }

  playerClicked(p: PlayerPreview) {
    console.log(`clicked on ${p.name}`);
    this.selectedPlayer = p;
    this.fetchRecentGames(p.name);
  }
}
