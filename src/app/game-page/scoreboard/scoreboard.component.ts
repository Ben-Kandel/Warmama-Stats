import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FullGame, Player } from 'src/app/interfaces';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  @Input() game: FullGame;
  @Output() playerHovered = new EventEmitter<Player>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!this.game.teams) {
      console.log('Team scores not available for this game...continuing.');
    }
  }

  gametypeLike(compare: string) {
    return this.game.gametype.includes(compare);
  }

  getPlayersByTeam(index: number): Player[] {
    let answer: Player[] = [];
    this.game.players.forEach(p => {
      if(p.team_num == index) {
        answer.push(p);
      }
    });
    return answer;
  }

  sortPlayersByScore(p: Player[]): Player[] {
    //sort by score, and then by name (i think this is how the scoreboard works in-game)
    return p.sort((a, b) => (a.score < b.score) ? 1 : (a.score === b.score) ? ((a.colored_name < b.colored_name) ? 1 : -1) : -1);
  }

  onHover(p: Player) {
    this.playerHovered.emit(p);
  }

  offHover() {
    this.playerHovered.emit();
  }

  navigateToPlayerPage(p: Player) {
    console.log('yep');
    this.router.navigate(['/player/' + p.colored_name]);
  }

}
