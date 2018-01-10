var fs = require("fs");

var Twitter = require('twitter');
var config = require('./keys.js');
var keys = config.twitterKeys;

var Spotify = require('node-spotify-api');

var request = require('request');

var action = process.argv[2];
var value = process.argv[3];


var client = new Twitter({
  consumer_key: '3fRByQfBTWtBSsxQFPCEFi1p6',
  consumer_secret: 'bRhe9OWA7XBWAJYqUF8CrAZh4sYlrGce4IETQlpk3tcUVbE9kZ',
  access_token_key: '950825172847742978-g0zE7raq8g4lUI9AXG2UatzPWAtUCLj',
  access_token_secret: 'TE8fsV1jjPwHStQ8w7H24lzQY0fQ7mzbn9war1BZStliZ'
});

function mytweets() {

	var params = {screen_name: 'Merlin73GoaT',
				result_type: 'recent',
				};

		client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  		
	  		if (error) {
	    	console.log(error)
	  		}
	  		else {
				for (var i = 0; i < 20; i++) {
					console.log(tweets.text)
				}
			}
	  	});
};

function spotifyThisSong(){

	var spotify = new Spotify({
	  id: 'cf4a4a3539224794bf2eef8b5dd5c957',
	  secret: 'b43933bc316344319fe81acd444efcac'
	});
 
	spotify.search({ type: 'track', query: value}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	  //else if()
 console.log(data); 
 console.log(artists.name);
 console.log(name);
 console.log(preview_url);
 console.log(album.name)
	});
};


function movieThis() {

	request('https://www.omdbapi.com/?t=' + value + '&y=&plot=short&apikey=3384836', function (error, response, body) {
	console.log('error:', error); // Print the error if one occurred
	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	console.log('body:', body); // Print the HTML for the ... homepage.
	
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

