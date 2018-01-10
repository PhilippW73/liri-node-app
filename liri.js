var fs = require("fs");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var config = require('./keys.js');
var twitterKeys = config.twitterKeys;
var spotifyKeys = config.spotifyKeys;

var action = process.argv[2];
var value = process.argv[3];

var twitterClient = new Twitter(twitterKeys);
var spotify = new Spotify(spotifyKeys);

function mytweets() {

	var params = {screen_name: 'Merlin73GoaT',
				result_type: 'recent',
				};

	twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
  		
  		if (error) {
    		console.log(error)
  		} else {
  			//console.log("looking at tweets.......................");
  			//console.log(tweets);
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].created_at)
				console.log(tweets[i].text)
			//make an if statement to break the loop, show only 20
			}
		}
  	});
};

function spotifyThisSong(){
 
	spotify.search({ type: 'track', query: value}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	  //else if()
 console.log(data); 

 console.log(data.tracks.items);
 // console.log(name);
 // console.log(preview_url);
 // console.log(album.name)
	});
};


function movieThis() {

	request('https://www.omdbapi.com/?t=' + value + '&y=&plot=short&apikey=3384836', function (error, response, body) {
	
	console.log('error:', error); // Print the error if one occurred
	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	//console.log('body:', body); // Print the HTML for the ... homepage.
	var info = JSON.parse(body);
	console.log('Title: ' + info.Title);
	console.log('Year: ' + info.Year);
	console.log('IMDB Rating: ' + info.imdbRating);
	console.log('Rotten Tomatoes Rating: ' + info.tomatoeRating);
	console.log('Country: ' + info.Country);
	console.log('Language: ' + info.Language);
	console.log('Plot: ' + info.Plot);
	console.log('Actors: ' + info.Actors);

	
	});


	
	   // * Title of the movie.(Title)
    //    * Year the movie came out. (Year)
    //    * IMDB Rating of the movie. (Rated)
    //    * Rotten Tomatoes Rating of the movie. (Ratings.Source.Rotten Tomatoes)
    //    * Country where the movie was produced. (Country)
    //    * Language of the movie. (Language)
    //    * Plot of the movie. (Plot)
    //    * Actors in the movie. (Actors)
}

switch (action) {
  case "my-tweets":
    mytweets();
    break;

  case "spotify-this-song":
    spotifyThisSong();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}



   // * `spotify-this-song`

   // * `movie-this`

   // * `do-what-it-says`

