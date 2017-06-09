var Twitter = require('twitter');

var REPO_ROOT = 'https://github.com/TheConnMan/my-public-apology/';
var version = process.env.npm_package_version;
var commit = (version || '').split('-').length === 1 ? null : version.split('-')[1].slice(0, 7);

module.exports.globals = {
  version: commit ? version.split('-')[0] + '-' + commit : version,
  versionLink: commit ? REPO_ROOT + 'commit/' + commit : REPO_ROOT + 'releases/tag/v' + version,
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,

  oauth: {
    google: {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }
  },

  twitter: {
    client: process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET && process.env.TWITTER_ACCESS_TOKEN_KEY && process.env.TWITTER_ACCESS_TOKEN_SECRET ? new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    }) : null,
    tracker: process.env.TWITTER_TRACKER
  }
};
