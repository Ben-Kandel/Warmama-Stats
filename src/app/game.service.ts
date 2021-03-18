import { Injectable } from '@angular/core';
// import { Game, Player, Weapon, Team, Award } from '../game';
import { HttpClient } from '@angular/common/http';
import { Game, FullGame, Player } from './testing';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

let DEBUG: boolean = false;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  testingURL = 'http://localhost:5000/wf-game-stats/us-central1/app';

  constructor(private http: HttpClient) { }




}
