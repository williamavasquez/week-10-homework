// *********Required modules to call *************
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var prompt = require('prompt');
// ********* end of modules *********************

// variables with the data from the console
var PersonArgument = process.argv[2];
var AdditionalArguments = process.argv[3];


var milliseconds = Date();
console.log(milliseconds);

// prompt.start();
//
// prompt.get(['username', 'email'], function (err, result) {
//   if (err) { return onErr(err); }
//   run = result.username
// });
//
// function onErr(err) {
//   console.log(err);
//   return 1;
// }

// switch function to check arguments
switch (PersonArgument) {
  case "my-tweets":
    TwitterCall();
    break;
  case "spotify-this-song":
    SpotifyCall();
    break;
  case "movie-this":
    MovieCall();
    break;
  default:
}

function TwitterCall(){
  // import twitter keys (this file is hidden to protect the user)
  var client = new Twitter(keys.twitterKeys);
  // These are the parameters we pass to the call (user name, and how many tweets we want back)
  var params = {screen_name: 'williamavasquez', count: 20};
  // get function from twitter
  client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].created_at+ " : " + tweets[i].text);
      }
    }else {
    console.log(error);
    }
  });
}

function SpotifyCall() {
  // check if we get a value or not
  if (AdditionalArguments === undefined) {
    AdditionalArguments = "what/'s my age again";
  }else {
    AdditionalArguments = process.argv[3];
  }
  // spotify search function
  spotify.search({ type: 'track', query: AdditionalArguments, limit:1 },

  function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Preview This Song: " + data.tracks.items[0].preview_url);
  });
}

function  MovieCall(){
  // check if we get a value or not
  if (AdditionalArguments === undefined) {
    AdditionalArguments = "what/'s my age again";
  }else {
    AdditionalArguments = process.argv[3];
  }

  request('http://www.omdbapi.com/?t=the+notebook&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      JsonBody = JSON.parse(body);
      console.log(JsonBody.Title);
      console.log(JsonBody.Year);
      console.log(JsonBody.imdbRating);
      console.log(JsonBody.Country);
      console.log(JsonBody.Language);
      console.log(JsonBody.Plot);
      console.log(JsonBody.Actors);
      console.log(JsonBody.tomatoRating);
      console.log(JsonBody.tomatoURL);
    }
  })
}
