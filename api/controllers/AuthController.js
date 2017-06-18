var passport = require('passport');

var log4js = require('log4js');
var logger = log4js.getLogger('api/controllers/AuthController');

module.exports = {

  index: function(req, res) {
    res.view();
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },

  google: function(req, res) {
    passport.authenticate('google', {
      failureRedirect: '/login',
      scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
    }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          logger.error(err);
          res.view('500');
          return;
        }

        logger.info(user.name + ' has logged in');
        res.redirect('/');
        return;
      });
    })(req, res);
  }
};
