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

export interface PlayerPreview {
  name: string;
  gameCount: number;
}

export interface AdvancedPlayerPreview {
  matchedNames: string[];
  recentGames: Game[];
  pstats: {
    total_score: number;
    total_frags: number;
    total_deaths: number;
    total_dmg_given: number;
    total_dmg_taken: number;
  }
}
