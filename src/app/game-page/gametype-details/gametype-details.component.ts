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
    let highest = 0;
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
    let highest = 0;
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
    let highest = 0;
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
    let highest = 0;
    this.game.players.forEach(p => {
      if(p.suicides > highest) {
        answer = p;
        highest = p.suicides;
      }
    });
    return answer;
  }

  getMostFlagCaps(): Player {
    let answer: Player;
    let highest = 0;
    this.game.players.forEach(p => {
      if(p.flagsCapped > highest) {
        answer = p;
        highest = p.flagsCapped;
      }
    });
    return answer;
  }

  getMostDefusesFromAwards(): Player {
    // so warmama isn't correctly recording these statistics, so I'm going to try a different way
    // it seems to be correctly recording awards, and you get an award for defusing the bomb: 'Bomb defused!'
    // so let's try to get the answer this way
    let answer: Player;
    let highest = 0;
    this.game.players.forEach(p => {
      p.awards.forEach(a => {
        if(a.name == 'Bomb defused!' && a.count > highest) {
          answer = p;
          highest = a.count;
        } 
      });
    });
    answer.bombsDefused = highest;
    return answer;
  }

  getMostHealthGained(): Player {
    let answer: Player;
    let highest = 0;
    this.game.players.forEach(p => {
      if(p.healthTaken > highest) {
        answer = p;
        highest = p.healthTaken;
      }
    });
    return answer;
  }

  getMostArmorGained(): Player {
    let answer: Player;
    let highest = 0;
    this.game.players.forEach(p => {
      if(p.armorTaken > highest) {
        answer = p;
        highest = p.armorTaken;
      }
    });
    return answer;
  }

}
