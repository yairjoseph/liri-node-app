var fs = require("fs");
var dotenv = require("dotenv").config();
var request = require("request");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = "";

for (let i = 3; i < process.argv.length; i++) {
    input += process.argv[i];
    if (i !== process.argv.length - 1) {
        input += "+";
    }
}
function spotifyInp(songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {

        var message = "Album name: " + data.tracks.items[0].album.name + "\n";
        message += "Artist name: " + data.tracks.items[0].album.artists[0].name + "\n";
        message += "Song name: " + data.tracks.items[0].name + "\n";

        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (let i = 0; i < data.length; i++) {
            var string = data[0].JSON.stringify();
        }
        if (data.tracks.items[0].preview_url === null) {
            // messages += "Sorry no preview link" + "\n";
            console.log("Sorry no preview link");
        }
        else {
            console.log("Preview link: " + data.tracks.items[0].preview_url);
            // messages += "Preview link: " + data.tracks.items[0].preview_url + "\n";
        }
        console.log(message);
        fs.appendFile("log.txt", message, (err) => {
            if (err) throw err;
        });
    });
}
switch (command) {
    case "concert-this":
        //Assign Url
        var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

        request(queryUrl, function (error, response, body) {
            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                // Parse the body of the site
                var concert = JSON.parse(body);

                var venName = concert[0].venue.name;
                var venDate = concert[0].datetime;
                var venCity = concert[0].venue.city

                var message = "Venue name: " + venName + "\n";
                message += "Venue date: " + venDate + "\n";
                message += "Venue city: " + venCity + "\n";
                // console.log(message);
                fs.appendFile("log.txt", message, (err) => {
                    if (err) throw err;
                });
            };
        });
        break;

    case "movie-this":
        if (input === "") {
            input = 'Mr.Nobody.';
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function (error, response, body) {
            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                // Parse the body of the site
                var movie = JSON.parse(body);

                var message = "Movie name: " + movie.Title + "\n";
                message += "Release date: " + movie.Released + "\n";
                message += "IMDB rating: " + movie.imdbRating + "\n";
                message += "Rotten Tomato rating: " + movie.Ratings[0].Value + "\n";
                message += "Country produced: " + movie.Country + "\n";
                message += "Languages: " + movie.Language + "\n";
                message += "Plot: " + movie.Plot + "\n";
                message += "Actors: " + movie.Actors + "\n";

                console.log(message);
                fs.appendFile("log.txt", message, (err) => {
                    if (err) throw err;
                });
            }
        });
        break;

    case "spotify-this-song":
        if (input === "") {
            input = 'the sign ace of base';
        }
        spotifyInp(input);
        break;

    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");

            // We will then re-display the content as an array for later use.
            var textParse = (JSON.parse(dataArr[1]));
            spotifyInp(textParse)
        });
        break;
}