export interface Game {
  id: number;
  gametype: string;
  map: string;
  hostname: string;
  teamgame: number;
  instagib: number;
  date: string;
  length: string;
}

export interface FullGame {
  id: number;
  gametype: string;
  map: string;
  hostname: string;
  teamgame: number;
  instagib: number;
  date: string;
  length: string;
  teams: {
    t1_score: number;
    t2_score: number;
  }
  players: Player[];
}

export interface Player {
  id: number;
  name: string;
  colored_name: string;
  team_num: number;
  score: number;
  frags: number;
  deaths: number;
  dmg_given: number;
  dmg_taken: number;
  weapons: Weapon[];
  duel_stats?: DuelStats;
  awards?: Award[];
}

export interface DuelStats {
  ga_taken: number;
  ya_taken: number;
  ra_taken: number;
  mh_taken: number;
  health_taken: number;
  armor_taken: number;
}

export interface Weapon {
  shots_hit: number;
  shots_fired: number;
  damage: number;
  frags: number;
  name: string;
}

export interface Award {
  name: string;
  count: number;
}

export interface PlayerPreview {
  name: string;
  colored_name: string;
  gameCount: number;
}

export interface AdvancedPlayerPreview {
  recentGames: Game[];
  pstats: {
    total_score: number;
    total_frags: number;
    total_deaths: number;
    total_dmg_given: number;
    total_dmg_taken: number;
  }
}
