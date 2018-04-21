require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");

var requirer = require("inquirer"); // Inquirer
var twitter = require("twitter"); // Twitter
var spotify = require("node-spotify-api"); // Spotify
var request = require("request"); // OMDB

var LIRICommands = process.argv[2]; // 
var userInput = process.argv[3]; // User input commands

switch(LIRICommands) {

    case 'my-tweets':
    tweetThis(); 
    break;

    case 'movie-this':
    movieThis();
    break;

    case 'spotify-this-song':
    spotifyThis(); 
    break;

    case 'do-what-it-says':
    doWhatItSays(); //Need to create a function doThis()
    break;      
};

function movieThis() {
    var movie = userInput;
    if(!movie) {
        movie = "mr nobody";
    }

    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&plot=short&tomatoes=true&apikey=trilogy";
    request(queryURL, function(error, response, body){

        // If the request is successful
        if(!error && response.statusCode === 200) {
            console.log("Here is the information for " + movie);
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        } else {
            console.log(error);
        };
    });
};

function tweetThis() {
    // Constructor
    var client = new twitter(keys.twitter);
    var twitterName = userInput;
    var params = {screen_name: twitterName, count: 20};
    // Retrieve 20 new tweets using the "get" method
    client.get(params, function(error, tweets, response){
        if(error) {
            console.log(error);
        };
        for(var i = 0; i < tweets.length; i++) {
            cosole.log(tweets[i].text);
        };
    });
};

function spotifyThis() {
    // Constructor
    var Spotify = new spotify({
        id: 'bf2e2db87a3341f2903d39194d376f41',
        secret: 'd238bf0e11d6442487a0a7e12fac9777'
    });
    // A user inputs a song's name
    var songName = userInput;
    // If a user does not put in a song name, then it will default to "The Sign"
    if(!songName) {
        songName = "The Sign";
    }

    spotify.search({type: 'track', query: songName}, function(error, data){
        if (error) {
            console.log('Error occured' + error);
        } else {
            console.log("Artists: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + songName.toUpperCase());
            console.log("Spotify Link: " + data.tracks.items[0].album.external_urls.spotify);
            console.log("Album Name: " + data.tracks.items[0].album.name);
        }
    });
};

function doWhatItSays () {
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error) {
            console.log(error);
        }
        data = data.split(",");
        console.log(data);

        command = data[0];
        parameter = data[1];

        parameter = parameter.replace('"', '');

        switch(command) {

            case "my-tweets":
            userInput = parameter;
            tweetThis();
            break;

            case "spotify-this-song":
            userInput = parameter;
            spotifyThis();
            break;

            case "movie-this":
            userInput = parameter;
            movieThis();
            break;
        }
    });
};