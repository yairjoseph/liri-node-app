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


function spotifyInp(songName){
    spotify.search({ type: 'track', query: songName}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (let i = 0; i < data.length; i++) {
            var string = data[0].JSON.stringify();
        }

        if (data.tracks.items[0].preview_url === null) {
            console.log("Sorry no preview link");
        }
        else {
            console.log("Preview link: " + data.tracks.items[0].preview_url);
        }
        console.log("Album name: " + data.tracks.items[0].album.name);
        console.log("Artist name: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song name: " + data.tracks.items[0].name);

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
                console.log(concert[0].datetime);
                console.log(concert[0].venue.name);
                console.log(concert[0].venue.city);
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
                console.log(movie.Title);
                console.log(movie.Released);
                console.log(movie.imdbRating);
                console.log(movie.Ratings[0].Value);
                console.log(movie.Country);
                console.log(movie.Language);
                console.log(movie.Plot);
                console.log(movie.Actors);
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

            // We will then print the contents of data
            // console.log(data);

            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");

            // We will then re-display the content as an array for later use.
            var textParse = (JSON.parse(dataArr[1]));
                spotifyInp(textParse)
        });

        break;

}


