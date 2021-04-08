# Warmama-Stats

### [Warmama](https://github.com/Qfusion/warmama)
### [OLD VERSION WEBSITE](https://wf-game-stats.web.app)
### [NEW VERSION BRANCH](https://github.com/Ben-Kandel/Warmama-Stats/tree/upgrade-everything)
### [NEW VERSION WEBSITE](http://warmama-stats.xyz/home)

Browse thousands of games, filter by specific gametypes, maps, and players, and get an in-depth view into each player's score, damage, accuracy, and more!


Everything is currently being re-written, you can look at the upgrade-everything branch to check it out. 
UPDATE: I finally purchased a domain, warmama-stats.xyz
Navigate over to http://warmama-stats.xyz to view the work-in-progress :)


## TODO
* Router caching, so we don't have to call the api every time we hit the forward or back button
* Complete database rehaul (I really don't like the NoSQL firestore database)
* Get more games from community members, I would really like to show Warsow games (I would change the website URL if this happened)
* More gametype specific pages, like a cool scoreboard for bomb games that shows additional, bomb-specific stats (like most team frags or bomb plants)
* Automatic insertion of recent games into the database (Right now I just run a script manually with match reports given to me by community members)
* A loading icon so it's clear if we are waiting for results from the api or if an error has occurred
* Make it mobile-friendly
