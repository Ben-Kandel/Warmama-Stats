const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const app = express();
admin.initializeApp();

const db = admin.firestore();

LIMIT = 10;

app.use(cors);

app.get('/api', (req, res) => {
  console.log('got a request');
  res.json({test: 'yep, it worked.'});
});

app.get('/api/id', async (req, res) => {  
  const snapshot = await db.collection('games').orderBy('match.demo_filename').limit(1).get();
  res.json({id: snapshot.docs[0].id});
  console.log(`sent id of first game ${snapshot.docs[0].id}`);
});

app.get('/api/idsAfter/:gameID', async (req, res) => {
  const snapshot = await db.collection('games').doc(req.params.gameID).get();
  const snapshot2 = await db.collection('games').orderBy('match.demo_filename').startAfter(snapshot).limit(LIMIT).get();
  let answer = [];
  snapshot2.forEach(game => {
    answer.push(game.id);
  })
  res.json(answer);
  console.log(`sent ${LIMIT} games after ${req.params.gameID}`);
});

app.get('/api/idsBefore/:gameID', async (req, res) => {
  const snapshot = await db.collection('games').doc(req.params.gameID).get();
  const snapshot2 = await db.collection('games').orderBy('match.demo_filename').endBefore(snapshot).limit(LIMIT).get();
  let answer = [];
  snapshot2.forEach(game => {
    answer.push(game.id);
  })
  res.json(answer);
  console.log(`sent ${LIMIT} games before ${req.params.gameID}`);
});

app.get('/api/games/:gameID', async (req, res) => {
  console.log('test');
  console.log('getting specific game ' + req.params.gameID);
  const doc = await db.collection('games').doc(req.params.gameID).get();
if(doc.exists) {
    // send the required info back
    res.json({id: doc.id, data: doc.data()});
  }else{
    // send an empty object
    res.json({id: '', data: {}}); 
  }
});

app.get('/api/games/:gametype/:limit/:offset', async (req, res) => {
  console.log(`getting ${req.params.limit} games in ${req.params.gametype} at offset ${req.params.offset}`);
  // const results =  await db.collection('games').where('match.gametype', '==', req.params.gametype).orderBy('match.demo_filename').limit(parseInt(req.params.limit)).offset(parseInt(req.params.offset)).get();
  const results =  await db.collection('games').where('match.gametype', '==', req.params.gametype).orderBy('match.timeplayed', 'desc').orderBy('match.demo_filename').limit(parseInt(req.params.limit)).offset(parseInt(req.params.offset)).get();
  let answer = [];
  results.forEach(obj => {
    answer.push({id: obj.id, data: obj.data()});
  });
  res.json(answer);
});

app.get('/api/games', async (req, res)=> {
  console.log('new request with params:');
  console.log(req.query);
  let ref = db.collection('games');
  if(req.query.gametype) {
    ref = ref.where('match.gametype', '==', req.query.gametype);
  }
  if(req.query.map) { 
    ref = ref.where('match.map', '==', req.query.map);
  }
  if(req.query.player) {
    ref = ref.where('match.player_names', 'array-contains', req.query.player);
  }

  
  // do this always
  ref = ref.orderBy('match.timestamp', 'desc');

  if(req.query.limit) {
    ref = ref.limit(parseInt(req.query.limit));
  }else {
    ref = ref.limit(10); //default limit
  }

  if(req.query.offset) {
    ref = ref.offset(parseInt(req.query.offset));
  } else {
    ref = ref.offset(0); //default offset
  }


  const results = await ref.get();
  let answer = [];
  results.forEach(obj => {
    answer.push({id: obj.id, data: obj.data()});
  });
  res.json(answer);
});

app.get('/api/player/:playerName', async (req, res) => {
  let name = req.params.playerName;
  console.log('asking for player ' + name);
  let ref = db.collection('games');
  ref.where('')
  const results = await ref.get();
  let answer = [];
  results.forEach(obj => {
    answer.push({id: obj.id, data: obj.data()});
  });
  res.json(answer);
});

exports.app = functions.https.onRequest(app);