# Warmama-Stats

### [Website](https://wf-game-stats.web.app)
### [Warmama](https://github.com/Qfusion/warmama)

Browse thousands of games, filter by specific gametypes, maps, and players, and get an in-depth view into each player's score, damage, accuracy, and more!


This project is very much a work in progress. If you have any suggestions, please don't hesitate to contact me :)


## TODO
* Router caching, so we don't have to call the api every time we hit the forward or back button
* Complete database rehaul (I really don't like the NoSQL firestore database)
* Get more games from community members, I would really like to show Warsow games (I would change the website URL if this happened)
* More gametype specific pages, like a cool scoreboard for bomb games that shows additional, bomb-specific stats (like most team frags or bomb plants)
* Automatic insertion of recent games into the database (Right now I just run a script manually with match reports given to me by community members)
* A loading icon so it's clear if we are waiting for results from the api or if an error has occurred
* Make it mobile-friendly
