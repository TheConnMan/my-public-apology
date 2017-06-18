'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  return db.addColumn('apology', 'tweetId', 'string', db.addColumn('apology', 'tweetUser', 'string', db.addColumn('apology', 'tweetImage', 'string', callback)));
};

exports.down = function(db, callback) {
  return db.removeColumn('apology', 'tweetImage', db.removeColumn('apology', 'tweetUser', db.removeColumn('apology', 'tweetId', callback)));
};

exports._meta = {
  "version": 1
};
