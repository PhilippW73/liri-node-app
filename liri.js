// insert instructions on how to use the command line inputs

var fs = require("fs");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var config = require('./keys.js');
var twitterKeys = config.twitterKeys;
var spotifyKeys = config.spotifyKeys;

//var furtherPossibility = require('./random.txt');

var action = process.argv[2];
var value = process.argv[3];

var twitterClient = new Twitter(twitterKeys);
var spotify = new Spotify(spotifyKeys);

function mytweets() {

	var params = {screen_name: 'Merlin73GoaT',
				result_type: 'recent',
				count: 20,
				};

	twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
  		
  		if (error) {
    		console.log(error)
  		} else {
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].created_at)
				console.log(tweets[i].text)
			//if statement to break the loop, show only 20 ?!?!
			}
		}
  	});
};

function spotifyThisSong(){
 
	spotify.search({ type: 'track', query: value}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }

	  
		var musicData = data.tracks.items;
		// console.log(data)
		// console.log(data.tracks);
		// console.log(data.tracks.items);
		// console.log(musicData[0].album.name);
		// console.log(musicData[0].artists[0].name);
		// console.log(musicData[0].name)
		// console.log(data.tracks.total)

			for (var i = 0; i<musicData.length; i++){
				for (j=0; j<musicData[i].artists.length; j++){
					    	    console.log("Artist: " + musicData[i].artists[j].name);
					        	console.log("Track: " + musicData[i].name);
					        	console.log("Preview URL: " + musicData[i].preview_url);
					        	console.log("Album Name: " + musicData[i].album.name + "\n");
				};
			};
	  });
 // If no song is provided then your program will default to "The Sign" by Ace of Base
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
	console.log('Actors: ' + info.Actors + "\n");
	});

//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
};

function doWhatItSays(){
// does not work at the moment.. work in progress
	fs.readFile('./random.txt', "UTF-8", function read(err, data) {
	    
		var seperation = data.split(',')

		console.log(seperation)
		//[ 'spotify-this-song', '"I Want it That Way"' ]

		var action = seperation[0];
		var myJSON = JSON.stringify(action);
		var value = seperation[1];

		console.log(action);
		console.log(value);

		if(action === "spotify-this-song") {
			spotifyThisSong();
		}
		else if(action === "my-tweets") {
			mytweets();
		}
		else if(action === "movie-this") {
			movieThis();
		}
	});
};

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
