import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Game } from 'src/game';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GameTableComponent implements OnInit {

  @Input() games: Game[];
  @Output() gameClicked = new EventEmitter<Game>();
  @Output() gameHovered = new EventEmitter<Game>();

  highlightedGame: Game;
  pageSize: number;
  pageIndex: number;
  pageNum: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      // @ts-ignore
      this.paramsUpdated(params.params); // yes we can do this
    })

  }
  
  onHover(game: Game) {
    this.gameHovered.emit(game);
  }

  offHover() {
    this.gameHovered.emit(undefined);
  }

  paramsUpdated(params) {
    let offset = (params.offset) ? parseInt(params.offset) : 0;
    // console.log('offset gotten from URL: ' + offset);
    // this.pageSize = (params.limit) ? parseInt(params.limit) : 10;
    let size = (params.limit) ? parseInt(params.limit) : 10;
    // console.log('page size gotten from URL: ' + size);
    let num = Math.floor(offset / size) + 1;
    // console.log('page num calculated from URL: ' + num);
    this.pageNum = num;
    this.pageSize = size;
  }

  rowClicked(game: Game){
    this.gameClicked.emit(game);
    this.highlightedGame = game;
  }

  prevPage() {
    let currentOffset = (this.pageNum - 1) * this.pageSize;
    // console.log('current offset: ' + currentOffset);
    if(currentOffset != 0) {
      this.router.navigate(['/browser'], { queryParams : { offset: currentOffset - this.pageSize}, queryParamsHandling : 'merge'});
    }
    
  }

  nextPage() {
    let result = this.pageNum * this.pageSize;
    this.router.navigate(['/browser'], { queryParams : { offset: result}, queryParamsHandling : 'merge'}); 
  }

}
