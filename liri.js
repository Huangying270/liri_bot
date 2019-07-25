require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var fs = require("fs");

var axios = require("axios");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
console.log(command);

// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

// "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"

var searchTerm = process.argv.slice(3).join(" ");
console.log(searchTerm);

switch (command) {
    case "concert-this":
        //search bands in town
        break;
    case "movie-this":
        //search omdb
        break;
    case "spotify-this-song":
        //search spotify
        break;
    case "do-what-it-says":
        // follow text in random.txt
        break;
    default:
        console.log("Please enter a valid search command");
}