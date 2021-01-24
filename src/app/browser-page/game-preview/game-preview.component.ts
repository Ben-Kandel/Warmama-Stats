import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Game } from '../../../game';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GamePreviewComponent implements OnInit {

  @Input() game: Game;

  constructor() { }

  ngOnInit(): void {
  }

}
