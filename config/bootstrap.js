var log4js = require('log4js');
var logger = log4js.getLogger('config/bootstrap');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var verifyHandler = function(token, tokenSecret, profile, done) {
  process.nextTick(function() {

    User.findOne({
      uid: profile.id
    }, function(err, user) {
      if (user) {
        return done(null, user);
      } else {
        var data = {
          provider: profile.provider,
          uid: profile.id,
          name: profile.displayName,
          photoUrl: profile._json.image && profile._json.image.url ? profile._json.image.url.split('sz=50').join('') : null
        };

        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.email = profile.emails[0].value;
        }

        User.create(data, function(err, user) {
          return done(err, user);
        });
      }
    });
  });
};

module.exports.bootstrap = function(cb) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({
      id: id
    }, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy({
    clientID: sails.config.globals.oauth.google.clientID,
    clientSecret: sails.config.globals.oauth.google.clientSecret,
    callbackURL: sails.config.serverUrl + '/auth/google/callback'
  }, verifyHandler));

  if (process.env.FLUENTD_HOST) {
    var tags = (process.env.FLUENTD_TAGS ? process.env.FLUENTD_TAGS.split(',') : []).reduce((allTags, tag) => {
      var pair = tag.split(':');
      allTags[pair[0].trim()] = pair.length === 1 ? true : pair[1].trim();
      return allTags;
    }, {});
    tags.function = 'MyPublicApology';
    log4js.addAppender(require('fluent-logger').support.log4jsAppender('my-public-apology', {
      host: process.env.FLUENTD_HOST,
      timeout: 3.0,
      tags
    }));
  }

  TwitterService.init();

  cb();
};
