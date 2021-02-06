import { Injectable } from '@angular/core';
import { Game, Player, Weapon, Team, Award } from '../game';
import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

let DEBUG: boolean = false;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  testingURL = 'http://localhost:5000/wf-game-stats/us-central1/app';

  constructor(private http: HttpClient) { }

  convertGame(object: any, gameID: string) : Game {
    // let teams: Team[] = object.teams;]
    let teams: Team[] = [];
    if(object.teams) {
      teams = object.teams;
    }else {
      // console.log('game has no teams');
    }

    let convertPlayer = (data) => {
      let weapons: Weapon[] = [];
      let awards: Award[] = [];

      if(data.weapons){
        for(let x of Object.keys(data.weapons)){
          let w: Weapon = {
            name: x,
            hits: data.weapons[x].strong_hits,
            shots: data.weapons[x].strong_shots,
            accuracy: data.weapons[x].strong_acc,
            damage: data.weapons[x].strong_dmg,
            frags: data.weapons[x].strong_frags
          };
          weapons.push(w);
        }
      }else{
        // console.log('player has no weapons.');
      }

      if(data.awards){
        data.awards.forEach(award => {
          let a: Award = {
            name: award.name,
            count: award.count
          };
          awards.push(a);
        });
      }else{
        // console.log('player has no awards.');
      }

      let answer: Player = {
        name: data.name,
        score: data.score,
        frags: data.frags,
        deaths: data.deaths,
        team: data.team,
        weapons: weapons,
        awards: awards,
        raTaken: data.ra_taken,
        yaTaken: data.ya_taken,
        gaTaken: data.ga_taken,
        mhTaken: data.mh_taken,
        uhTaken: data.uh_taken,
        healthTaken: data.health_taken,
        armorTaken: data.armor_taken,
        bombsPlanted: data.bombs_planted,
        bombsDefused: data.bombs_defused,
        flagsCapped: data.flags_capped,
        timeplayed: data.timeplayed,
        numrounds: data.numrounds,
        teamfrags: data.teamfrags,
        suicides: data.suicides,
      }
      return answer;
    };

    let players: Player[] = object.players.map(x => convertPlayer(x));

    let date = new Date(object.match.demo_filename.slice(0, object.match.demo_filename.search('_')));

    let answer: Game = {
      id: gameID,
      gametype: object.match.gametype,
      map: object.match.map,
      hostname: object.match.hostname,
      time: object.match.timeplayed,
      date: date,
      players: players,
      teams: teams
    }
    return answer;
  }

  async getGame(id: string): Promise<Game> {
    try{
      let x:any;
      if(DEBUG) {
        x = await this.http.get(this.testingURL + `/api/games/${id}`).toPromise();
      }else {
        x = await this.http.get(`/api/games/${id}`).toPromise();
      }
      return this.convertGame(x.data, x.id);
    } catch(err) {
      console.log(err);
    }
  }

  async getFirstID(): Promise<string> {
    try{
      // let x:any = await this.http.get(this.testingURL + '/api/id').toPromise();
      let x:any = await this.http.get('/api/id').toPromise();
      return x.id;
    } catch(err) {
      console.log(err);
    }
  }

  async getNext10Games(id: string): Promise<Game[]> {
    try{
      // let ids: any = await this.http.get(this.testingURL + '/api/idsAfter/' + id).toPromise();
      let ids: any = await this.http.get('/api/idsAfter/' + id).toPromise();
      let answer: Game[] = [];
      ids.forEach(async (id) => {
        let game = await this.getGame(id);
        answer.push(game);
      });
      return answer;
    } catch(err){
      console.log(err);
    }
  }

  async getPrev10Games(id: string): Promise<Game[]> {
    try{
      return [];
    } catch(err){
      console.log(err);
    }
  }

  async getAllGames(): Promise<Game[]> {
    console.log('test');
    try{
      // let x:any = await this.http.get(this.testingURL + '/api/games').toPromise();
      let x:any = await this.http.get('/api/games').toPromise();
      let answer: Game[] = [];
      x.forEach(obj => {
        console.log('id: ' + obj.id);
        console.log(obj.data);
        answer.push(this.convertGame(obj.data, obj.id));
      });
      return answer;
    } catch(err) {
      console.log(err);
    }
  }

  async getPagedGames(gametype: string, limit: number, offset: number): Promise<Game[]> {
    try{
      // let x:any = await this.http.get(this.testingURL + `/api/games/${gametype}/${limit}/${offset}`).toPromise();
      let x:any = await this.http.get(`/api/games/${gametype}/${limit}/${offset}`).toPromise();
      let answer: Game[] = [];
      x.forEach(obj => {
        answer.push(this.convertGame(obj.data, obj.id));
      });
      return answer;
    } catch(err) {
      console.log(err);
    }
  }

  async testGetGames(query: string): Promise<Game[]> {
    let test = (query: string): string => { // calculate whether the leading '?' character should be in the url
      return (query == '') ? '' : '?' + query;
    }

    try{
      let url: string;
      if(DEBUG) {
        url = `${this.testingURL}/api/games${test(query)}`; 
      }else {
        url = `/api/games${test(query)}`;
      }
      let x: any = await this.http.get(url).toPromise();
      let answer: Game[] = [];
      x.forEach(obj => {
        answer.push(this.convertGame(obj.data, obj.id));
      });
      return answer;
    } catch(err) {
      console.log(err);
    }
  }


}
