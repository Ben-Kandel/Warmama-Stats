import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Game, Player } from '../../../game';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScoreboardComponent implements OnInit {

  @Input() game: Game;
  @Output() playerHovered = new EventEmitter<Player>();

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    let g = changes.game.currentValue;
    if(this.game.teams.length !=0 ){
      this.makeTeamsEven();
    }
  }

  gametypeLike(query: string) {
    return this.game.gametype.includes(query);
  }

  makeTeamsEven() {
    // first, we gotta find out if they are not the same size
    // team 1 is index 0, team 2 is index 1

    let team0 = this.filterPlayersByTeam(0).length;
    let team1 = this.filterPlayersByTeam(1).length;
    let diff = Math.abs(team0-team1);
    if(team0 == team1) return; // we are done.
    if(team0 > team1) {
      for(let i = 0; i < diff; i++){
        this.game.players.push({
          name: '--',
          score: 0,
          frags: 0,
          deaths: 0,
          team: 1,
          weapons: [],
          awards: [],
          raTaken: 0,
          yaTaken: 0,
          gaTaken: 0,
          mhTaken: 0,
          uhTaken: 0,
          bombsPlanted: 0,
          bombsDefused: 0,
        });
      }
    }
    if(team1 > team0){
      for(let i = 0; i < diff; i++){
        this.game.players.push({
          name: '--',
          score: 0,
          frags: 0,
          deaths: 0,
          team: 0,
          weapons: [],
          awards: [],
          raTaken: 0,
          yaTaken: 0,
          gaTaken: 0,
          mhTaken: 0,
          uhTaken: 0,
          bombsPlanted: 0,
          bombsDefused: 0,
        });
      }
    }
  }

  filterPlayersByTeam(teamName: number){
    return this.game.players.filter(x => x.team == teamName);
  }

  sortPlayersByScore(players: Player[]){
    //sorts a list of players by score in descending order (highest to lowest)
    return players.sort((a,b) => b.score - a.score);
  }

  onHover(player: Player) {
    if(player.name != '--'){ // filtering out fake players I inserted
      this.playerHovered.emit(player);
    }
  }

  offHover() {
    this.playerHovered.emit(undefined);
  }

}
