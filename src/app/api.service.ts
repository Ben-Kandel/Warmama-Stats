import { Injectable } from '@angular/core';
import { AdvancedPlayerPreview, Game, PlayerPreview, FullGame, Player, Weapon, FullPlayer } from './interfaces';
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
  
  async getPlayers(query: string): Promise<PlayerPreview[]> {
    let test = (query: string): string => { // calculate whether the leading '?' character should be in the url
      return (query == '') ? '' : '?' + query;
    }

    let url: string;
    if(DEBUG) {
      url = `${testURL}/api/players${test(query)}`
    }else {
      url = `/api/players${test(query)}`;
    }
    try {
      let x = await this.http.get<PlayerPreview[]>(url).toPromise();
      return x;
    }catch(err) {
      console.log(err);
    }
  }

  // I'm cheating a little bit here. The data we get back does not contain full PlayerPreview objects.
  // They only have the 'colored_name' property filled out.
  // It feels unnecessary to create an interface with only one property, so I'm just using the existing
  // PlayerPreview interface, which only has 3 properties anyway.
  // This function is only used by the game-browser to show a list of players when hovering over a game
  async getPlayersInGame(id: number): Promise<PlayerPreview[]> {
    let url: string;
    if(DEBUG) {
      url = `${testURL}/api/playersInGame/${id}`;
    }else {
      url = `/api/playersInGame/${id}`;
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

  async getFullPlayer(coloredPlayerName: string, gametype?: string): Promise<FullPlayer> {
    let url: string;
    if(DEBUG) {
      url = `${testURL}/api/players/${coloredPlayerName}`;
      
    }else {
      url = `/api/players/${coloredPlayerName}`;
    }
    if(gametype) {
      url += `?gametype=${gametype}`;
    }
    try {
      let x = await this.http.get<FullPlayer>(url).toPromise();
      return x;
    } catch(err) {
      console.log(err);
    }
  }

}
