module.exports = {

  find: function(req, res) {
    if (req.query.username) {
      return User.findOne({
        name: req.query.username
      }).then(user => {
        if (user) {
          delete req.query.username;
          req.query.user = user.id;
          return Apology.find(req.query)
          .populate('user')
          .then(apologies => {
            return res.ok(apologies);
          });
        } else {
          return res.ok([]);
        }
      });
    } else {
      return Apology.find(req.query)
      .populate('user')
      .then(apologies => {
        return res.ok(apologies);
      });
    }
  },

  create: function(req, res) {
    var body = req.body || {};
    return Apology.create({
      title: body.title,
      note: body.note,
      user: req.session.passport.user
    }).then(apology => {
      return res.ok(apology);
    }).catch(err => {
      return res.badRequest('Invalid apology attributes: ' + Object.keys(err.invalidAttributes).join(', '));
    });
  },

  update: function(req, res) {
    var body = req.body || {};
    return Apology.findOne({
      id: req.params.id,
      user: req.session.passport.user
    })
    .then(apology => {
      if (apology) {
        apology.title = body.title;
        apology.note = body.note;
        return apology.save().then(() => {
          return res.ok(apology);
        });
      } else {
        res.notFound();
      }
    }).catch(err => {
      return res.badRequest('Invalid apology attributes: ' + Object.keys(err.invalidAttributes).join(', '));
    });
  },

  destroy: function(req, res) {
    return Apology.findOne({
      id: req.params.id,
      user: req.session.passport.user
    }).then(apology => {
      if (apology) {
        return apology.destroy().then(() => {
          return res.ok(apology);
        });
      } else {
        return res.notFound();
      }
    });
  }

};
