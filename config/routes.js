module.exports.routes = {
  '/': 'HomeController.index',

  '/apology/:user/:id': 'HomeController.share',

  '/logout': 'AuthController.logout',

  '/apology/view/:id': 'ApologyController.view'
};
