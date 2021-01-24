import { Component, Input, OnInit } from '@angular/core';
import { Player, Game, Weapon, Award } from 'src/game';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() game: Game;
  @Input() hover: Player;

  mappings = {
    'GL' : 'grenadelauncher.png',
    'GB' : 'gunblade.png',
    'LG' : 'lasergun.png',
    'MG' : 'machinegun.png',
    'PG' : 'plasmagun.png',
    'RG' : 'riotgun.png',
    'RL' : 'rocketlauncher.png',
    'EB': 'electrobolt.png',
    'IG': 'instagun.png',
  }

  constructor() { }

  ngOnInit(): void { }

  convertToPath(name: string) {
    return this.mappings[name];
  }

  filterOutFakePlayers(): Player[] {
    return this.game.players.filter(x => {
      return x.name != '--';
    });
  }

  sumUpDamage(player: Player): number {
    return player.weapons.map(weapon => weapon.damage).reduce((a, b) => a + b, 0);
  }

  getTopDamagePlayers(amount: number, list: Player[] ) : Player[] {
    let results = list.sort((a, b) => this.sumUpDamage(b) - this.sumUpDamage(a));
    return results.slice(0, amount);
  }

  getMostUsedWeapon(list: Player[]) {
    let weapons = new Map();
    list.forEach(player => {
      player.weapons.forEach(weapon => {
        let name = weapon.name;
        let shots = weapon.shots;
        if(weapons.has(name)){
          weapons.set(name, weapons.get(name) + shots);
        }else {
          weapons.set(name, shots)
        }
      });
    });
    // https://stackoverflow.com/questions/51690146/javascript-finding-highest-value-in-map-vs-object
    let [name, num] = [...weapons.entries()].reduce((a, e ) => e[1] > a[1] ? e : a);
    return `${name} at ${num.toLocaleString()} shots`;
  }

  getMostDamagingWeapon(list: Player[]) {
    let weapons = new Map();
    list.forEach(player => {
      player.weapons.forEach(weapon => {
        let name = weapon.name;
        let dmg = weapon.damage;
        if(weapons.has(name)){
          weapons.set(name, weapons.get(name) + dmg);
        }else {
          weapons.set(name, dmg);
        }
      });
    });
    // https://stackoverflow.com/questions/51690146/javascript-finding-highest-value-in-map-vs-object
    let [name, num] = [...weapons.entries()].reduce((a, e ) => e[1] > a[1] ? e : a);
    return `${name} with ${num.toLocaleString()} damage`;
  }

  getAccuraciesDescending(): Weapon[] {
    if(this.hover.weapons.length == 0) {
      return [];
    }
    return this.hover.weapons.sort((a, b) => b.accuracy - a.accuracy);
  }

  getDamagesDescending(): Weapon[] {
    if(this.hover.weapons.length == 0){
      return [];
    }
    return this.hover.weapons.sort((a, b) => b.damage - a.damage);
  }

  getAwardsDescending(): Award[] {
    if(this.hover.awards.length == 0){
      return [];
    }
    return this.hover.awards.sort((a, b) => b.count - a.count);
  }


}
