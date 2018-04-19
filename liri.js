require("dotenv").config();

// Reading and writing the files
var fs = require("fs");

// Reading the keys
var keys = require("./keys.js");

// Requiring inquirer
var 


// Twitter
var twitter = require("twitter");
var client = new twitter(keys.twitter);

// Function to retrieve my last 20 tweets
function myTweets() {

}



// Spotify
var spotify = require("node-spotify-api");
var Spotify = new spotify(keys.spotify);

// Function to retrieve information about a song
function findSong () {

}





// OMDB
var request = require("request");

// Requesting OMDB api

