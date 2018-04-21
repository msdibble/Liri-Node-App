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

    case 'movie-this':
    movieThis();
    break;

    // case 'my-tweets':
    // tweetThis(); // Need to create a function tweetThis()
    // break;

    // case 'spotify-this-song':
    // spotifyThis(); // Need to create a function spotifyThis()
    // break;

    // case 'do-what-it-says':
    // doThis(); //Need to create a function doThis()
    // break;      
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
        }
    });
};
