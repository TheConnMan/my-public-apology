module.exports.policies = {

   '*': true,

   'ApologyController': {
     update: 'isAuthenticated',
     create: 'isAuthenticated',
     delete: 'isAuthenticated'
   }
};
