module.exports.routes = {
  '/': 'HomeController.index',

  '/logout': 'AuthController.logout',

  '/apology/view/:id': 'ApologyController.view'
};
