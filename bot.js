var Twit = require('twit');

var T = new Twit({
  consumer_key:         'KXJJ7qVdojKOu6MQs8vrtnFI8',
  consumer_secret:      'cP0HosSyDF6MKXaipae6CJMy7VnsZSHdPcN12tMxd6d5yUrLsZ',
  access_token:         '1224783566040707078-ukQM4mMVvsPVk4EFSnjURSUFoAtWJa',
  access_token_secret:  'PNthcKLkBNQMdfuuhyRcXNo48Pg8JxsVB2gTuP6g4VzK1',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

var hastagSearch = { q: '#corona', count: 10, result_type: 'recent' }

// A user stream
var stream = T.stream('user');
// When someone follows the user
stream.on('follow', followed);
stream.on('tweet', tweetEvent);
stream.on('error', function(error) {
    console.log(error);
});

// In this callback we can see the name and screen name
function followed (event) {
  var name = event.source.name;
  var screenName = event.source.screen_name;
  var response = 'Thanks for following me, ' + name + ' @' + screenName;
  // Post that tweet!
  T.post('statuses/update', { status: response }, tweeted);

  console.log('I was followed by: ' + name + ' @' + screenName);
}


function tweetEvent (tweet) {
  // If we wanted to write a file out
  // to look more closely at the data
  // var fs = require('fs')
  // var json = JSON.stringify(tweet,null,2)
  // fs.writeFile("tweet.json", json, output)

  // Who is this in reply to?
  var reply_to = tweet.in_reply_to_screen_name;
  // Who sent the tweet?
  var name = tweet.user.screen_name;
  // What is the text?
  var txt = tweet.text;

  // Ok, if this was in reply to me
  // Replace selftwitterhandle with your own twitter handle
  console.log(reply_to, name, txt)
  if (reply_to === 'selftwitterhandle') {

    // Get rid of the @ mention
    txt = txt.replace(/@selftwitterhandle/g, '');

    // Start a reply back to the sender
    var reply = 'Hi @' + name + ' ' + ', Thanks for the mention :)';

    console.log(reply);
    // Post that tweet!
    T.post('statuses/update', { status: reply }, tweeted);
  }
}

// This function finds the latest tweet with the #hashtag, and retweets it.
function retweetLatest () {
  T.get('search/tweets', hastagSearch, function (error, data) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
    }
    // If our search request to the server had no errors...
    if (!error) {
      // ...then we grab the ID of the tweet we want to retweet...
      var retweetId = data.statuses[0].id_str;
      // ...and then we tell Twitter we want to retweet it!
      T.post('statuses/retweet/' + retweetId, {}, tweeted);
    }
    // However, if our original search request had an error, we want to print it out here.
    else {
      if (debug) {
        console.log('There was an error with your hashtag search:', error);
      }
    }
  })
}

// Make sure it worked!
function tweeted (err, reply) {
  if (err !== undefined) {
    console.log(err);
  } else {
    console.log('Tweeted: ' + reply);
  }
}

// Try to retweet something as soon as we run the program...
retweetLatest();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 12);
setInterval(Postavi,1000*60*60);
Postavi();
function Postavi(){
	var r=Math.floor(Math.random()*100);

var tweet={
	status: r + 'Moj novi tvit'

};
var novi={
	status:r + 'Ja sam bot.Aco srbine'
};
T.post('statuses/update',tweet,tweeted);
T.post('statuses/update',novi,tweeted);

function tweeted(err,data,response){
	if(err){
		console.log("Greska");
	}
	else{
		console.log("Uspesan tvit");
	}

}

}