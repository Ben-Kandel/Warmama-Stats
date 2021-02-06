import { Injectable } from '@angular/core';
import { Game } from './testing';
import { HttpClient } from '@angular/common/http';

let DEBUG: boolean = false;
let testURL = 'http://localhost:3000/api/games/5';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  async getGameList(query: string): Promise<Game[]> {
    let test = (query: string): string => { // calculate whether the leading '?' character should be in the url
      return (query == '') ? '' : '?' + query;
    }
    try {
      let x = await this.http.get<Game[]>('http://localhost:3000/api/games').toPromise();
      x.forEach(game => {
        console.log(game);
      });
      return x;
    }catch(err) {
      console.log(err);
    }
  }
}
