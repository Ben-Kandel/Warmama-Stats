import { Component, Input, OnInit } from '@angular/core';
import { FullGame, Player, Weapon } from 'src/app/testing';

@Component({
  selector: 'app-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: ['./stats-list.component.scss']
})
export class StatsListComponent implements OnInit {

  @Input() hover: Player;
  @Input() game: FullGame;
  tableMode = 'accuracy';
  WEAPON_NAMES = ['RL', 'LG', 'EB', 'GL', 'MG', 'RG' ,'PG', 'GB'];
  showHitFired = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleHitFired() {
    this.showHitFired = !this.showHitFired; // flip the boolean
  }

  isHighestAccuracy(w: Weapon): boolean {
    let this_acc = w.shots_hit / w.shots_fired * 100;
    for(let player of this.game.players) {
      let weapon = this.getWeaponByName(player, w.name);
      if(weapon != undefined) {
        let other_acc = weapon.shots_hit / weapon.shots_fired * 100;
        if(other_acc > this_acc) {
          return false; // if somebody else has higher accuracy than us, then...obviously we are not the highest
        }
      }
    }
    return true; // if we made it through every player without finding a higher accuracy, then we are it!
  }

  isHighestDamage(w: Weapon): boolean {
    let this_dmg = w.damage;
    for(let player of this.game.players) {
      let weapon = this.getWeaponByName(player, w.name);
      if(weapon != undefined) {
        let other_dmg = weapon.damage;
        if(other_dmg > this_dmg) {
          return false; // if somebody else has more damage than us, then obviously we are not the highest
        }
      }
    }
    return true; // if we made it through every player without finding someone with more damage than us, then we are it!
  }

  changeTableMode(mode: string) {
    this.tableMode = mode;
  }

  sortPlayersByScore(): Player[] {
    return this.game.players.sort((a,b) => b.score - a.score);
  }

  getWeaponByName(p: Player, name: string): Weapon {
    return p.weapons.find(x => x.name == name);
  }

}
