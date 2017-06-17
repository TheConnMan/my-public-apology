var client = sails.config.globals.twitter.client;

var log4js = require('log4js');
var logger = log4js.getLogger('api/models/Apology');

module.exports = {

  attributes: {
    title: 'String',
    note: 'Text',
    tweetId: 'String',
    tweetUser: 'String',
    tweetImage: 'String',
    views: {
      type: 'integer',
      defaultsTo: 0
    },

    user: { model: 'user' }
  },

  afterCreate: function(record, cb) {
    if (client && sails.config.globals.twitter.tweetNewApologies) {
      (record.user ? User.findOne({ id: record.user}) : Promise.resolve()).then(user => {
        var title = (record.title.length > 116 ? record.title.substring(0, 113) + '...' : record.title);
        var apologyLink = sails.config.serverUrl + '/#!/apology/' + (user ? user.name.split(' ').join('-') + '/' : '') + record.id;
        var status = (record.tweetId ? 'New public apology from @' + record.tweetUser + '!' : title) + ' ' + apologyLink + (record.tweetId ? ' ' + getTweetUrl(record) : '');
        client.post('statuses/update', {status: status}, function(error, tweet, response) {
          if (error) {
            logger.error(error);
          } else {
            logger.info('Tweet created: https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str);
          }
          cb();
        });
      });
    } else {
      cb();
    }
  }
};

function getTweetUrl(record) {
  return 'https://twitter.com/' + record.tweetUser + '/status/' + record.tweetId;
}
