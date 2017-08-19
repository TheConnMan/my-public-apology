module.exports = {
  index: function(req, res) {
    res.view('homepage', {
      user: req.user,
      server: sails.config.serverUrl
    });
  },

  share: function(req, res) {
    var path = '/#!' + req.path;
    if (req.get('user-agent').indexOf('Mozilla') == -1) {
      Apology.findOne({
        id: req.param('id')
      })
      .populate('user')
      .then(apology => {
        res.view('robots', {
          layout: false,
          path,
          apology,
          note: apology.note && apology.note.length >= 100 ? apology.note.substring(0, 99) + '...' : apology.note,
          username: apology.user ? apology.user.name : apology.tweetUser
        });
      });
    } else {
      res.redirect(path);
    }
  }
};
