import { Component, Input, OnInit } from '@angular/core';
import { Game, Player } from 'src/game';

@Component({
  selector: 'app-gametype-details',
  templateUrl: './gametype-details.component.html',
  styleUrls: ['./gametype-details.component.scss']
})
export class GametypeDetailsComponent implements OnInit {

  @Input() game: Game;

  constructor() { }

  ngOnInit(): void {
  }

  isGametype(query: string): boolean {
    return this.game.gametype.includes(query);
  }

  getMostPlants(): Player {
    let answer: Player;
    let highest = -1;
    this.game.players.forEach(p => {
      if(p.bombsPlanted > highest) {
        answer = p;
        highest = p.bombsPlanted;
      }
    });
    return answer;
  }

  getMostDefuses(): Player {
    let answer: Player;
    let highest = -1;
    this.game.players.forEach(p => {
      if(p.bombsDefused > highest) {
        answer = p;
        highest = p.bombsDefused;
      }
    });
    return answer;
  }

  getMostTeamFrags(): Player {
    let answer: Player;
    let highest = -1;
    this.game.players.forEach(p => {
      if(p.teamfrags > highest) {
        answer = p;
        highest = p.teamfrags;
      }
    });
    return answer;
  }

  getMostSuicides(): Player {
    let answer: Player;
    let highest = -1;
    this.game.players.forEach(p => {
      if(p.suicides > highest) {
        answer = p;
        highest = p.suicides;
      }
    });
    return answer;
  }

}
