// IMPORTS

const mysql = require('mysql2/promise');
const fs = require('fs');
const builder = require('mysql-bricks');

// DEFINING CONSTANTS

const REPORTS_DIR = './reports';
const WEAPON_LIST = ['RL', 'EB', 'LG', 'GL', 'PG', 'MG', 'RG', 'GB']; // don't worry about IG not being here

// HELPER FUNCTIONS

// returns a string representing how much time a game took
// https://dev.mysql.com/doc/refman/8.0/en/time.html
function parseTime(gameObj) {
  let num = gameObj.match.timeplayed;
  let hours = Math.floor(num / 3600) // there are 3600 seconds in an hour
  let minutes = Math.floor((num / 60) % 60);
  let seconds = num % 60;
  let answer = hours.toLocaleString().padStart(2, '0') + minutes.toLocaleString().padStart(2, '0') + seconds.toLocaleString().padStart(2, '0');
  return answer;
}

// returns an object with : {hit, fired, damage, frags}
function parseWeapon(weaponsObj, weaponName) {
  if(weaponsObj[weaponName]) {
    return {
      shots_hit: weaponsObj[weaponName].strong_hits,
      shots_fired: weaponsObj[weaponName].strong_shots,
      damage: weaponsObj[weaponName].strong_dmg,
      frags: weaponsObj[weaponName].strong_frags
    }
  }
}

// inserts a row into the games table and returns the game_id
async function insertGameRow(conn, gameData, filename) {
  let gametype = gameData.match.gametype;
  let map = gameData.match.map;
  let hostname = gameData.match.hostname;
  let teamgame = (gameData.match.teamgame) ? gameData.match.teamgame : 0;
  let instagib = (gameData.match.instagib) ? gameData.match.instagib : 0;
  //warmama match reports files come in names like:
  // YYYY-MM-DD-something.json
  // that means we can take the date right out of the file name
  let date = filename.slice(0, 10);
  let length = parseTime(gameData);
  let query = builder.insert('games', 'gametype', 'map', 'hostname', 'teamgame', 'instagib', 'date', 'length')
  .values([gametype, map, hostname, teamgame, instagib, date, length]);
  try {
    const [rows, _] = await conn.execute(query.toString());
    return rows.insertId; // the game_id
  }catch(err) {
    console.log(err);
  }
  
}

async function insertTeamsRow(conn, gameData, game_id) {
  let t1_score = (gameData.teams[0].index == 0) ? gameData.teams[0].score : gameData.teams[1].score;
  let t2_score = (gameData.teams[1].index == 1) ? gameData.teams[1].score : gameData.teams[0].score;
  let query = builder.insert('teams', 'game_id', 't1_score', 't2_score')
    .values([game_id, t1_score, t2_score]);
  try {
    conn.execute(query.toString());
  }catch(err) {
    console.log(err);
  }
}

async function insertDuelStatsRow(conn, playerData, game_id, player_id) {
  let ga_taken = playerData.ga_taken;
  let ya_taken = playerData.ya_taken;
  let ra_taken = playerData.ra_taken;
  let mh_taken = playerData.mh_taken;
  let health_taken = playerData.health_taken;
  let armor_taken = playerData.armor_taken;
  let query = builder.insert('duel_stats', 'game_id', 'player_id', 'ga_taken', 'ya_taken', 'ra_taken', 'mh_taken', 'health_taken', 'armor_taken')
    .values([game_id, player_id, ga_taken, ya_taken, ra_taken, mh_taken, health_taken, armor_taken]);
  try {
    conn.execute(query.toString());
  }catch(err) {
    console.log(err);
  }
}

async function insertPlayerRow(conn, playerData, game_id) {
  let colored_name = playerData.name;
  let name = playerData.name.replace(/\^[0-9]/g, '');
  let team_num = playerData.team; // it's okay for this to be null and sometimes it is
  let query = builder.insert('players', 'name', 'colored_name', 'team_num', 'game_id')
    .values([name, colored_name, team_num, game_id]);
  try {
    let [rows, _] = await conn.execute(query.toString());
    return rows.insertId; // the player_id
  }catch(err) {
    console.log(err);
  }
}

async function insertPlayerStatsRow(conn, playerData, game_id, player_id) {
  let score = playerData.score;
  let frags = playerData.frags;
  let deaths = playerData.deaths;
  let dmg_given = playerData.dmg_given;
  let dmg_taken = playerData.dmg_taken;
  let query = builder.insert('p_stats', 'player_id', 'game_id', 'score', 'frags', 'deaths', 'dmg_given', 'dmg_taken')
    .values([player_id, game_id, score, frags, deaths, dmg_given, dmg_taken]);
  try {
    conn.execute(query.toString());
  }catch(err) {
    console.log(err);
  }
}

async function insertNormalWeaponRow(conn, player_id, weaponName, weaponData) {
  let shots_hit = weaponData.shots_hit;
  let shots_fired = weaponData.shots_fired;
  let damage = weaponData.damage;
  let frags = weaponData.frags;
  let query = builder.insert(weaponName, 'player_id', 'shots_hit', 'shots_fired', 'damage', 'frags')
    .values([player_id, shots_hit, shots_fired, damage, frags]);
  try {
    conn.execute(query.toString());
  }catch(err) {
    console.log(err);
  }
}

async function insertInstagibWeaponRow(conn, player_id, weaponData) {
  let shots_hit = weaponData.shots_hit;
  let shots_fired = weaponData.shots_fired;
  let frags = weaponData.frags;
  let query = builder.insert('IG', 'player_id', 'shots_hit', 'shots_fired', 'frags')
    .values([player_id, shots_hit, shots_fired, frags]);
  try {
    conn.execute(query.toString());
  }catch(err) {
    console.log(err);
  }
}

// insert awards row
async function insertAwardsRow(conn, awardData, player_id, game_id) {
  let name = awardData.name;
  let count = awardData.count;
  let query = builder.insert('awards', 'game_id', 'player_id', 'name', 'count')
    .values([game_id, player_id, name, count]);
  try {
    conn.execute(query.toString());
  }catch(err) {
    console.log(err);
  }
}




// MAIN FUNCTION

async function main() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'testpassword',
    database: 'testing'
  });
  console.log('CONNECTED TO DB.');

  console.log('PROCESSING MATCH REPORTS:');
  filenames = fs.readdirSync(REPORTS_DIR);
  for(let file of filenames) {
    let data = JSON.parse(fs.readFileSync(REPORTS_DIR + '/' + file));
    let game_id = await insertGameRow(conn, data, file);
    console.log('inserted game and got a game id of ' + game_id);
    
    // for games with teams
    let teamgame = (data.match.teamgame) ? data.match.teamgame : 0;
    if(teamgame == 1 && data.teams && data.teams.length == 2) {
      await insertTeamsRow(conn, data, game_id);
      // console.log('inserted teams row');
    }

    // what's next? let's do players because everything comes from there.
    for(let playerData of data.players) {
      // console.log(playerData);

      // record this player
      let player_id = await insertPlayerRow(conn, playerData, game_id);
      // console.log('inserted player and got id of ' + player_id);
      let gametype = data.match.gametype;
      if(gametype && gametype.includes('duel')) { // if it has the word 'duel' in it
        await insertDuelStatsRow(conn, playerData, game_id, player_id);
        // console.log('inserted duel_stats row');
      }else if(gametype.includes('ctf')) {
        // do ctf specific stuff
        // nothing right now because the match reports are bugged
      }else if(gametype.includes('bomb')) {
        // do bomb specific stuff
        // nothing right now because the match reports are bugged
      }

      // record this player's stats, like score, frags, deaths
      await insertPlayerStatsRow(conn, playerData, game_id, player_id);
      // record this player's weapon stats
      let instagib = (data.match.instagib) ? data.match.instagib : 0;
      let weapons = playerData.weapons;
      if(weapons) { // if this player used any weapons at all

        if(instagib) {
          let x = parseWeapon(weapons, 'IG');
          if(x) {
            await insertInstagibWeaponRow(conn, player_id, x);
          }
        }else {
          for(let weaponName of WEAPON_LIST) {
            let x = parseWeapon(weapons, weaponName);
            if(x) {
              await insertNormalWeaponRow(conn, player_id, weaponName, x);
            }
          }
        }
      }

      //now lets record their awards
      if(playerData.awards) { // if this player has any awards
        for(let award of playerData.awards) { // loop through each one
          await insertAwardsRow(conn, award, player_id, game_id); // insert it
        }
      }

    }
  }
  console.log('DONE PROCESSING MATCH REPORTS.');

  console.log('CLOSING CONNECTION TO DB.');
  conn.end();
}

// DO IT
main();
