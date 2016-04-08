var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');

var PersonArgument = process.argv[2];
var AdditonalArgument = process.argv[3];

switch (PersonArgument) {
  case "my-tweets":
    TwitterCall();
    break;
  case "spotify-this-song":
    SpotifyCall();
    break;
  default:
}

function TwitterCall(){
  var client = new Twitter(keys.twitterKeys);
  var params = {screen_name: 'williamavasquez', count: 20};

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
if (AdditonalArgument === undefined) {
  console.log("if worked");
  AdditonalArgument = "what/'s my age again";
}else {
  console.log("else worked");
  AdditonalArgument = process.argv[3];
}

spotify.search({ type: 'track', query: AdditonalArgument, limit:1 }, function(err, data) {
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
