import { Component, Input, OnInit } from '@angular/core';
import { FullGame, Player, Weapon } from 'src/app/testing';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() hover: Player;
  @Input() game: FullGame;

  constructor() { }

  ngOnInit(): void {
  }

  gametypeLike(compare: string) {
    return this.game.gametype.includes(compare);
  }

  getDamageRatio(p: Player): number {
    return p.dmg_given / p.dmg_taken;
  }

  getKDRatio(p: Player): number {
    return p.frags / p.deaths;
  }

  getAccuracy(w: Weapon): number {
    return w.shots_hit / w.shots_fired * 100;
  }

  parseGametype(): string {
    if(this.game.gametype.includes('bomb')) {
      return 'bomb';
    }else if(this.game.gametype.includes('ctf')) {
      return 'ctf';
    }else if(this.game.gametype.includes('duel')) {
      return 'duel'
    }else if(this.game.gametype.includes('ffa')) {
      return 'ffa';
    }else if(this.game.gametype.includes('ca') || this.game.gametype.includes('ftag')) {
      // 'ca' is the most likely to match when we don't want it to, so we'll put it last
      return 'ca';
    }
    return 'idk';
  }

  getMostHealthGained(): Player {
    let p1 = this.game.players[0];
    let p2 = this.game.players[1];
    return (p1.duel_stats.health_taken > p2.duel_stats.health_taken) ? p1 : p2; // don't care about ties
  }

  getMostArmorGained(): Player {
    let p1 = this.game.players[0];
    let p2 = this.game.players[1];
    return (p1.duel_stats.armor_taken > p2.duel_stats.armor_taken) ? p1 : p2; // don't care about ties
  }  

  getMostDamageGiven(): Player {
    let highest = 0;
    let answer: Player;
    for(let player of this.game.players) {
      if(player.dmg_given > highest) {
        answer = player;
        highest = player.dmg_given;
      }
    }
    return answer;
  }

  getMostDamageTaken(): Player {
    let highest = 0;
    let answer: Player;
    for(let player of this.game.players) {
      if(player.dmg_taken > highest) {
        answer = player;
        highest = player.dmg_taken;
      }
    }
    return answer;
  }

  getMostFrags(): Player {
    let highest = 0;
    let answer: Player;
    for(let player of this.game.players) {
      if(player.frags > highest) {
        answer = player;
        highest = player.frags;
      }
    }
    return answer;
  }

  getWeaponByName(player: Player, name: string): Weapon {
    return player.weapons.find(w => w.name == name);
  }

  getHighestEB(): Player {
    let highestAcc = 0;
    let answer: Player;
    for(let player of this.game.players) {
      let eb = this.getWeaponByName(player, 'EB');
      if(eb) {
        let this_acc = this.getAccuracy(eb);
        if(this_acc > highestAcc) {
          answer = player;
          highestAcc = this_acc;
        }
      }
    }
    return answer;
  }

  getHighestLG(): Player {
    let highestAcc = 0;
    let answer: Player;
    for(let player of this.game.players) {
      let lg = this.getWeaponByName(player, 'LG');
      if(lg) {
        let this_acc = this.getAccuracy(lg);
        if(this_acc > highestAcc) {
          answer = player;
          highestAcc = this_acc;
        }
      }
    }
    return answer;
  }


}
