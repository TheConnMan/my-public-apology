module.exports = {

  attributes: {
    provider: 'String',
    uid: 'String',
    name: 'String',
    email: 'String',
    photoUrl: 'String',

    apologies: {
      collection: 'apology',
      via: 'user'
    }
  }
};
