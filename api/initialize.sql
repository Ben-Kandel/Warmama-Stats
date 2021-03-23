CREATE DATABASE IF NOT EXISTS testing;
use testing;

CREATE TABLE IF NOT EXISTS games (
	id INT auto_increment PRIMARY KEY,
    gametype VARCHAR(30),
    map VARCHAR(30),
    hostname VARCHAR(60),
    teamgame BOOLEAN NOT NULL,
	instagib BOOLEAN NOT NULL,
    date DATE NOT NULL,
    length TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS players (
	id INT auto_increment PRIMARY KEY,
    name VARCHAR(30),
    colored_name VARCHAR(30),
    game_id INT,
    team_num INT
);

CREATE TABLE IF NOT EXISTS teams (
	game_id INT,
    t1_score INT,
    t2_score INT
);

CREATE TABLE IF NOT EXISTS p_stats (
	player_id INT,
    game_id INT,
    score INT NOT NULL,
    frags INT NOT NULL,
    deaths INT NOT NULL,
    dmg_given INT NOT NULL,
    dmg_taken INT NOT NULL
);

CREATE TABLE IF NOT EXISTS duel_stats (
	game_id INT,
    player_id INT,
    ga_taken INT NOT NULL,
    ya_taken INT NOT NULL,
    ra_taken INT NOT NULL,
    mh_taken INT NOT NULL,
    health_taken INT NOT NULL,
    armor_taken INT NOT NULL
);

-- CREATE TABLE IF NOT EXISTS bomb_stats (
-- 	
-- );

-- CREATE TABLE IF NOT EXISTS ctf_stats (
-- 	
-- );

CREATE TABLE IF NOT EXISTS RL (
	player_id INT,
    shots_hit INT,
    shots_fired INT,
    damage INT,
    frags INT
);

CREATE TABLE IF NOT EXISTS EB (
	player_id INT,
    shots_hit INT,
    shots_fired INT,
    damage INT,
    frags INT
);

CREATE TABLE IF NOT EXISTS LG (
	player_id INT,
    shots_hit INT,
    shots_fired INT,
    damage INT,
    frags INT
);

CREATE TABLE IF NOT EXISTS GL (
	player_id INT,
    shots_hit INT,
    shots_fired INT,
    damage INT,
    frags INT
);

CREATE TABLE IF NOT EXISTS MG (
	player_id INT,
    shots_hit INT,
    shots_fired INT,
    damage INT,
    frags INT
);

CREATE TABLE IF NOT EXISTS PG (
	player_id INT,
    shots_hit INT,
    shots_fired INT,
    damage INT,
    frags INT
);

CREATE TABLE IF NOT EXISTS RG (
	player_id INT,
    shots_hit INT,
    shots_fired INT,
    damage INT,
    frags INT
);

CREATE TABLE IF NOT EXISTS GB (
	player_id INT,
    shots_hit INT,
    shots_fired INT,
    damage INT,
    frags INT
);

-- instagun has one less columnn 
CREATE TABLE IF NOT EXISTS IG (
	player_id INT,
    shots_hit INT,
    shots_fired INT,
    frags INT
);
