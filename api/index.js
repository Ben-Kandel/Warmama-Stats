const mysql = require('mysql2');
const builder = require('mysql-bricks');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
let app = express();
app.use(helmet());
app.use(cors());


// for local testing

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'testpassword',
  database: 'testing',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
  decimalNumbers: true, // so that when we sum up columns we get numbers back, not strings
});

const promisePool = pool.promise();

// takes the text, and inserts the values to make an sql query
// returns a string
function convertQuery(text, values) {  
  // let answer = text;
  for(let i = 1; i < values.length+1; i++) {
    let search = '$' + i;  
    text = text.replace(search, values[i-1]);
  }
  return text;
}

app.get('/', async (req, res) => {
  res.send('hey');
});

//for a single game. we return information about that game, as well as the players and their stats. we want everything
app.get('/api/games/:game_id', async (req, res) => {
  try {
    let game_id = parseInt(req.params.game_id);
    let query = builder.select().from('games').where({id: game_id}).toString();
    console.log(query);
    let [rows, fields]= await promisePool.query(query);
    if(rows.length == 0) {
      console.log(`Couldn't find game with id ${game_id}`);
      res.sendStatus(404);
      return;
    }

    let gameObj = rows[0];

    // if it was a team game, we need to get team information
    if(gameObj.teamgame) {
      let query = builder.select('t1_score', 't2_score').from('teams').where({game_id: game_id}).toString();
      console.log(query);
      let [rows, fields]= await promisePool.query(query);
      let teamsObj = rows[0];
      gameObj.teams = teamsObj;
    }

    //lets get player stats now
    gameObj.players = [];
    query = builder.select('players.id, players.name, players.colored_name, players.team_num, p_stats.score, p_stats.frags, p_stats.deaths, p_stats.dmg_given, p_stats.dmg_taken')
    .from('players').join('p_stats').on({'players.id' : 'p_stats.player_id'}).where({'players.game_id' : game_id}).toString();
    console.log(query);
    let [players, _] = await promisePool.query(query);
    // array.push can take multiple arguments, so we can use ...players to unpack each object and give it as an argument

    //get weapon stats for each player
    for(let i = 0; i < players.length; i++) {
      let playerObj = players[i];
      let player_id = playerObj.id; // get the id for this player
      if(gameObj.instagib) { // then we get instagib stats for these players        
        let [stats, _] = await promisePool.query('SELECT shots_hit, shots_fired, frags, \'IG\' AS name FROM IG WHERE player_id = ' + player_id);
        playerObj.weapons = [stats[0]]; // only one weapon for insta game
        gameObj.players.push(playerObj);
      }else {        
        let [stats, _] = await promisePool.query(`CALL getWeaponStats(${player_id})`); // call the stored procedure to get stats
        playerObj.weapons = []; // initialize empty weapons array
        playerObj.weapons.push(...stats[0]); // push the array of weapons on
        gameObj.players.push(playerObj); // add completed player to gameObj
      }
    }

    // get additional game stats
    // right now only duel stats works because it's the only gamemode that warmama decides to record properly
    if(gameObj.gametype.includes('duel')) {
      let [stats, _] = await promisePool.query('SELECT * FROM duel_stats WHERE game_id = ' + game_id);
      // let's put it on the playerObj
      for(let i = 0; i < stats.length; i++) { // for each duel stat
        let theStats = stats[i];
        let playerObj = players.find(p => p.id == theStats.player_id); // get the player
        playerObj.duel_stats = theStats;
      }
    }else if(gameObj.gametype.includes('bomb')) {
      // soon :)
    }else if(gameObj.gametype.includes('ctf')) {
      // soon :)
    }

    res.send(gameObj);
    
  }catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});


//for browsing games. that means we dont return ALL of the data about a game, just a few basic things to show in a list
app.get('/api/games', async (req, res) => {  

  let query = builder.select('games.id, games.map, games.gametype, games.hostname, games.date, games.length').from('games');

  if(req.query.player_name) {
    query = query.join('players').on({'games.id' : 'players.game_id'}).where(builder.like('players.name', `%${req.query.player_name}%`));
  }

  if(req.query.gametype) {
    query = query.where({'games.gametype' : `${req.query.gametype}`});
  }

  if(req.query.map) {
    query = query.where({'games.map' : `${req.query.map}`});
  }

  query = query.orderBy('games.date DESC'); // by default, we will sort by most recent games first
  query = query.limit(10); // default limit of 10

  if(req.query.offset) {
    query = query.offset(req.query.offset);
  }else {
    // query = query.offset(0) // default offset of 0
  }

  try {
    query = query.toString();
    console.log(query);
    let [rows, fields] = await promisePool.query(query);
    res.send(rows);
  }catch(err) {
    console.log(err);
    res.sendStatus(404);
  }

});

app.get('/api/recentGames/:player_name', async (req, res) => {
  let name = req.params.player_name;
  let query = 
  `SELECT games.* FROM players\
  JOIN games ON players.game_id = games.id\
  WHERE players.name LIKE "%${name}%"\
  ORDER BY date DESC, length DESC\
  LIMIT 10;`
  // lets just replace this with a stored procedure, something like getRecentGamesOf(name)
  let [rows, _] = await promisePool.query(query);
  console.log(query);
  res.send(rows);
});

app.get('/api/playerInfo/:player_name', async (req, res) => {
  // the shape of the data we will be sending back
  let answer = {
    matchedNames: [],
    recentGames: [],
    pstats: {},
  };
  let name = req.params.player_name;

  let query = `SELECT DISTINCT name FROM players WHERE name LIKE "%${name}%"`;
  let [rows, fields] = await promisePool.query(query);
  // res.send(l.map(x => x.gametype));
  answer.matchedNames = rows.map(x => x.name);
  query = `SELECT games.* FROM players\
  JOIN games ON players.game_id = games.id\
  WHERE players.name LIKE "%${name}%"\
  ORDER BY date DESC, length DESC\
  LIMIT 10`;
  [rows, fields] = await promisePool.query(query);
  answer.recentGames = rows;
  query = `SELECT sum(p_stats.score) AS total_score, sum(p_stats.frags) AS total_frags, sum(p_stats.deaths) AS total_deaths, \
  sum(p_stats.dmg_given) AS total_dmg_given, sum(p_stats.dmg_taken) AS total_dmg_taken\
  FROM players\
  JOIN p_stats ON players.id = p_stats.player_id\
  WHERE players.name LIKE "%${name}%"`;
  [rows, fields]= await promisePool.query(query);
  answer.pstats = rows[0];
  res.send(answer);
});

// endpoint for getting the list of all gametypes in the database
app.get('/api/gametypes', async (req, res) => {
  let [rows, fields]= await promisePool.query('CALL getAllGametypes()');
  if(rows.length == 0) {
    res.sendStatus(404); // there are no games in the database, so, there are no gametypes
    return; // get out
  }
  let l = rows[0]; // unwrap the extra array
  res.send(l.map(x => x.gametype)); // unwrap the { gametype : xx } objects into just the values
});

app.get('/api/players', async (req, res) => {
  let query = builder.select('name, count(*) AS game_count').from('players').groupBy('name').orderBy('game_count DESC');
  let offset = (req.query.offset) ? req.query.offset : 0;
  let limit = (req.query.limit)? req.query.limit : 10;
  query = query.offset(offset).limit(limit);
  try {
    query = query.toString();
    let [rows, fields] = await promisePool.query(query);
    console.log(rows);
    res.send(rows);
  }catch(err) {
    console.log(err);
    res.sendStatus(404);
  }  
});





//req.params.x for /:paramter
//req.query.x for ?name=something&height=5

app.listen(3000, () => {
  console.log('Listening at port 3000.');
});