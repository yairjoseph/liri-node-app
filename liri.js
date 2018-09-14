var dotenv = require("dotenv").config();
var request = require("request");
var moment = require("moment");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

console.log(Spotify);

var command = process.argv[2];

var input = "";
for (let i = 3; i < process.argv.length; i++) {
    input += process.argv[i];
    if (i !== process.argv.length - 1) {
        input += "+";
    }
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
            // if (input === "") {
            //     input = 'Mr.Nobody.';
            // }

        });
        break;

    case "do-what-it-says":

        break;

    case "spotify-this-song":
        //     var queryUrl = 
        //     request(queryUrl, function(error, response, body) {

        //   // If the request is successful (i.e. if the response status code is 200)
        //   if (!error && response.statusCode === 200) {

        //     // Parse the body of the site and recover just the imdbRating
        //     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        //     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        //   }
        // });

        break;

}


