export interface Game {
  id: string;
  gametype: string;
  map: string;
  hostname: string;
  time: number;
  date: Date;
  teams: Team[];
  players: Player[];
}

export interface Player {
  name: string;
  score: number;
  frags: number;
  deaths: number;
  team: number;
  weapons: Weapon[];
  awards: Award[];
  raTaken: number;
  yaTaken: number;
  gaTaken: number;
  mhTaken: number;
  uhTaken: number;
  bombsPlanted: number;
  bombsDefused: number;
  timeplayed: number;
  numrounds: number;
  teamfrags: number;
  suicides: number;
}

export interface Weapon {
  name: string;
  hits: number;
  shots: number;
  accuracy: number;
  damage: number;
  frags: number;
}

export interface Team {
  name: string;
  index: number;
  score: number;
}

export interface Award {
  name: string;
  count: number;
}