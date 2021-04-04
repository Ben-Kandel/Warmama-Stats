CREATE DATABASE IF NOT EXISTS testing;
use testing;

CREATE TABLE games (
	id INT auto_increment PRIMARY KEY,
  gametype VARCHAR(30) NOT NULL,
  map VARCHAR(30) NOT NULL,
  hostname VARCHAR(60) NOT NULL,
  teamgame BOOLEAN NOT NULL,
  instagib BOOLEAN NOT NULL,
  date DATE NOT NULL,
  length TIME NOT NULL,
  UNIQUE INDEX (id),
  INDEX (gametype),
  INDEX (map),
  INDEX (hostname)
);

CREATE TABLE players (
	id INT auto_increment PRIMARY KEY,
  game_id INT NOT NULL,
  name VARCHAR(30) NOT NULL,
  colored_name VARCHAR(30) NOT NULL,
  team_num INT,
  UNIQUE INDEX (id),
  INDEX (game_id)
);

CREATE TABLE teams (
	game_id INT NOT NULL,
  t1_score INT NOT NULL,
  t2_score INT NOT NULL
);

CREATE TABLE p_stats (
	player_id INT NOT NULL,
  game_id INT NOT NULL,
  score INT NOT NULL,
  frags INT NOT NULL,
  deaths INT NOT NULL,
  dmg_given INT NOT NULL,
  dmg_taken INT NOT NULL
);

CREATE TABLE duel_stats (
	game_id INT NOT NULL,
  player_id INT NOT NULL,
  ga_taken INT NOT NULL,
  ya_taken INT NOT NULL,
  ra_taken INT NOT NULL,
  mh_taken INT NOT NULL,
  health_taken INT NOT NULL,
  armor_taken INT NOT NULL
);

-- CREATE TABLE  bomb_stats (
-- 	
-- );

-- CREATE TABLE  ctf_stats (
-- 	
-- );

CREATE TABLE RL (
	player_id INT NOT NULL,
  shots_hit INT NOT NULL,
  shots_fired INT NOT NULL,
  damage INT NOT NULL,
  frags INT NOT NULL,
  INDEX (player_id)
);

CREATE TABLE EB (
	player_id INT NOT NULL,
  shots_hit INT NOT NULL,
  shots_fired INT NOT NULL,
  damage INT NOT NULL,
  frags INT NOT NULL,
  INDEX (player_id)
);

CREATE TABLE LG (
	player_id INT NOT NULL,
  shots_hit INT NOT NULL,
  shots_fired INT NOT NULL,
  damage INT NOT NULL,
  frags INT NOT NULL,
  INDEX (player_id)
);

CREATE TABLE GL (
	player_id INT NOT NULL,
  shots_hit INT NOT NULL,
  shots_fired INT NOT NULL,
  damage INT NOT NULL,
  frags INT NOT NULL,
  INDEX (player_id)
);

CREATE TABLE MG (
	player_id INT NOT NULL,
  shots_hit INT NOT NULL,
  shots_fired INT NOT NULL,
  damage INT NOT NULL,
  frags INT NOT NULL,
  INDEX (player_id)
);

CREATE TABLE PG (
	player_id INT NOT NULL,
  shots_hit INT NOT NULL,
  shots_fired INT NOT NULL,
  damage INT NOT NULL,
  frags INT NOT NULL,
  INDEX (player_id)
);

CREATE TABLE RG (
	player_id INT NOT NULL,
  shots_hit INT NOT NULL,
  shots_fired INT NOT NULL,
  damage INT NOT NULL,
  frags INT NOT NULL,
  INDEX (player_id)
);

CREATE TABLE GB (
	player_id INT NOT NULL,
  shots_hit INT NOT NULL,
  shots_fired INT NOT NULL,
  damage INT NOT NULL,
  frags INT NOT NULL,
  INDEX (player_id)
);

-- instagun has one less columnn 
CREATE TABLE IG (
	player_id INT NOT NULL,
  shots_hit INT NOT NULL,
  shots_fired INT NOT NULL,
  frags INT NOT NULL,
  INDEX (player_id)
);

CREATE TABLE awards (
  game_id INT NOT NULL, 
  player_id INT NOT NULL, 
  name VARCHAR(30) NOT NULL,
  count INT NOT NULL, 
  INDEX (game_id)
);
