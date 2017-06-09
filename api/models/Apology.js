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
  }
};
