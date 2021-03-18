import { Component, Input, OnInit } from '@angular/core';
import { FullGame, Player } from 'src/app/testing';

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

}
