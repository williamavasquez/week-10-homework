var keys = require('./keys.js');
var Twitter = require('twitter');

// var Twitter = require('twitter');

// // console.log(Twitter);
//
// var PersonArgument = process.argv[2];
//
// var command = ['my-tweets','spotify-this-song','movie-this','do-what-it-says'];



var client = new Twitter(keys.twitterKeys);

var params = {screen_name: 'williamavasquez', count: 3};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
    }
  }else {
    console.log(error);
  }
});
