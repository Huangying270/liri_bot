require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var fs = require("fs");

var axios = require("axios");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
console.log(command);

var searchTerm = process.argv.slice(3).join(" ");
console.log(searchTerm);

switch (command) {

    case "concert-this":
        //search bands in town
        searchBIT(searchTerm);
        break;

    case "movie-this":
        //search omdb
        searchOMDB(searchTerm);
        break;

    case "spotify-this-song":
        //search spotify
        searchSpotify(searchTerm);
        break;

    case "do-what-it-says":
        // follow text in random.txt
        doWhatOtSays();
        break;

    default:
        console.log("Please enter a valid search command");
}

function searchOMDB(movie) {

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {

            //console.log(response);
            // console log homework requirements
            console.log(response.data.Title);

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

function searchBIT(artist) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {

            //console.log(response.data[0]);
            var BITdata = response.data[0];

            console.log("Venue name: " + BITdata.venue.name);
            console.log("Country: " + BITdata.venue.country);
            console.log("City: " + BITdata.venue.city);
            console.log("Date: " + BITdata.datetime);

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function searchSpotify(song) {

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0]);
    });
}

function doWhatOtSays() {

    fs.readFile("random.txt", "utf8", function (err, data) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);



        //within readFile function
        switch (dataArr[0]) {

            case "concert-this":
                //search bands in town
                searchBIT(dataArr[1]);
                break;

            case "movie-this":
                //search omdb
                searchOMDB(dataArr[1]);
                break;

            case "spotify-this-song":
                //search spotify
                searchSpotify(dataArr[1]);
                break;

            case "do-what-it-says":
                // follow text in random.txt
                doWhatOtSays();
                break;

            default:
                console.log("Please enter a valid search command");
        }
    });
}