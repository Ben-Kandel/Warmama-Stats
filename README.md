# Warmama-Stats

### [Warmama](https://github.com/Qfusion/warmama)
### [OLD VERSION WEBSITE](https://wf-game-stats.web.app)
### [NEW VERSION BRANCH](https://github.com/Ben-Kandel/Warmama-Stats/tree/upgrade-everything)
### [NEW VERSION WEBSITE](http://192.243.103.112/home)

Browse thousands of games, filter by specific gametypes, maps, and players, and get an in-depth view into each player's score, damage, accuracy, and more!


Everything is currently being re-written, you can look at the upgrade-everything branch to check it out. 
Alternatively you can navigate to http://192.243.103.112 in your web browser. I haven't set up a proper domain yet, so you'll have to use that IP for now.
The most finished pages are the player browser and game page. I would recommend **avoiding** the other pages for now :)
http://192.243.103.112/browser/players
If you click on any game, you'll be sent to the full game page, for example, http://192.243.103.112/game/3235


## TODO
* Router caching, so we don't have to call the api every time we hit the forward or back button
* Complete database rehaul (I really don't like the NoSQL firestore database)
* Get more games from community members, I would really like to show Warsow games (I would change the website URL if this happened)
* More gametype specific pages, like a cool scoreboard for bomb games that shows additional, bomb-specific stats (like most team frags or bomb plants)
* Automatic insertion of recent games into the database (Right now I just run a script manually with match reports given to me by community members)
* A loading icon so it's clear if we are waiting for results from the api or if an error has occurred
* Make it mobile-friendly
