var client = sails.config.globals.twitter.client;

var log4js = require('log4js');
var logger = log4js.getLogger('api/services/TwitterService');

module.exports = {

  init: function() {
    if (client && sails.config.globals.twitter.tracker) {
      client.stream('statuses/filter', {track: sails.config.globals.twitter.tracker}, function(stream) {
        stream.on('data', function(event) {
          if (isTweet(event) && !event.retweeted_status && !event.quoted_status) {
            Apology.create({
              title: 'Twitter Apology from @' + event.user.screen_name,
              tweetId: event.id_str,
              tweetUser: event.user.screen_name,
              tweetImage: event.user.profile_image_url_https,
              note: event.text
            }).catch(e => {
              logger.error(e);
            });
          }
        });

        stream.on('error', function(error) {
          logger.error(error);
          throw error;
        });
      });
    }
  }
};

function isTweet(event) {
  return typeof event.contributors === 'object' && typeof event.id_str === 'string' && typeof event.text === 'string';
}
