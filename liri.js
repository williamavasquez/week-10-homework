// *********Required modules to call *************
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var prompt = require('prompt');
var fs = require('fs');
// ********* end of modules *********************

// variables with the data from the console
personArgument = process.argv[2];
AdditionalArguments = process.argv[3];
// ****************************************************
// switch function to check arguments
function switchFunction(personArgument){
  switch (personArgument) {
    case "my-tweets":
      TwitterCall();
      break;
    case "spotify-this-song":
      SpotifyCall();
      break;
    case "movie-this":
      MovieCall();
      break;
    case "do-what-it-says":
      WhatitSaysCall();
      break;
    default:
      personArgument = "No Command";
      additionalArguments = "no arguments";
      console.log("please introduce a command ('my-tweets', 'spotify-this-song','movie-this')");
  }
};
switchFunction(personArgument);
function TwitterCall(){
  AdditionalArguments = "Last 20 Tweets"
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
    AdditionalArguments = 'Mr. Nobody';
  }else {
    AdditionalArguments = process.argv[3];
  }

  request('http://www.omdbapi.com/?t='+AdditionalArguments+'&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
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

function WhatitSaysCall() {
  fs.readFile('random.txt', 'utf8', function(err,data){
    var things = data.split(',');
    console.log(things[1]);
  })
}

function logAction() {
  var milliseconds = Date();
  logData = '\r\n' + milliseconds + ":  "+ personArgument + " - " + AdditionalArguments
  fs.appendFile('log.txt', logData);
  console.log("appended");
}

// log every command in log.txt file
logAction();

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
