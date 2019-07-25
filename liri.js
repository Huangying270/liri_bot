require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var axios = require("axios");

var spotify = new Spotify(keys.spotify);

// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

// "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"