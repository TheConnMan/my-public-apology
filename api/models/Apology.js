module.exports = {

  attributes: {
    title: 'String',
    note: 'Text',
    views: {
      type: 'integer',
      defaultsTo: 0
    },

    user: { model: 'user' }
  }
};
