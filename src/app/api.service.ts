import { Injectable } from '@angular/core';
import { AdvancedPlayerPreview, Game, PlayerPreview, FullGame, Player, Weapon } from './testing';
import { HttpClient } from '@angular/common/http';

let DEBUG: boolean = true;
let testURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  async getGameList(query: string): Promise<Game[]> {
    let test = (query: string): string => { // calculate whether the leading '?' character should be in the url
      return (query == '') ? '' : '?' + query;
    }

    let url: string;
    if(DEBUG) {
      url = `${testURL}/api/games${test(query)}`
    }else {
      url = `/api/games${test(query)}`;
    }

    try {
      let x = await this.http.get<Game[]>(url).toPromise();
      return x;
    }catch(err) {
      console.log(err);
    }
  }

  async getGametypes(): Promise<string[]> {
    let url: string;
    if(DEBUG) {
      url = `${testURL}/api/gametypes`;
    }else {
      url = '/api/gametypes';
    }
    try {
      let x = await this.http.get<string[]>(url).toPromise();
      return x;
    }catch(err) {
      console.log(err);
    }
  }
  

  async getAllPlayers(): Promise<PlayerPreview[]> {
    let url: string;
    if(DEBUG) {
      url = `${testURL}/api/players`;
    }else {
      url = '/api/players';
    }
    try {
      let x = await this.http.get<PlayerPreview[]>(url).toPromise();
      return x;
    }catch(err) {
      console.log(err);
    }
  }

  async getRecentPlayerGames(name: string): Promise<Game[]> {
    let url: string;
    if(DEBUG) {
      url = `${testURL}/api/recentGames/${name}`;
    }else{
      url = `/api/recentGames/${name}`;
    }
    try {
      let x = await this.http.get<Game[]>(url).toPromise();
      return x;
    }catch(err) {
      console.log(err);
    }
  }

  async getPlayerInfo(name: string): Promise<AdvancedPlayerPreview> {
    let url: string;
    if(DEBUG) {
      url = `${testURL}/api/playerInfo/${name}`;
    }else{
      url = `/api/playerInfo/${name}`;
    }
    try {
      let x = await this.http.get<AdvancedPlayerPreview>(url).toPromise();
      return x;
    }catch(err) {
      console.log(err);
    }
  }

  async getFullGame(gameID: string): Promise<FullGame> {
    let url: string;
    let id = Number(gameID);
    if(!Number.isInteger(id)) { // get rid of invalid ids
      return;
    }
    if(DEBUG) {
      url = `${testURL}/api/games/${gameID}`
    }else {
      url = `/api/games/${gameID}`;
    }
    try {
      let x: FullGame = await this.http.get<FullGame>(url).toPromise();
      return x;
    } catch(err) {
      console.log(err);
    }

  }

}
