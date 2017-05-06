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
  createUsers(db).then(() => {
    return createApologies(db);
  }).then(callback);
};

exports.down = function(db, callback) {
  return db.dropTable('apology', null, db.dropTable('user', null, callback));
};

exports._meta = {
  "version": 1
};

function createUsers(db) {
  return new Promise((resolve, reject) => {
    db.createTable('user', {
      id: {
        type: 'int',
        primaryKey: true,
        autoIncrement: true
      },
      provider: 'string',
      uid: 'string',
      name: 'string',
      email: 'string',
      photoUrl: 'string',
      createdAt: 'datetime',
      updatedAt: 'datetime'
    }, resolve);
  });
}

function createApologies(db) {
  return new Promise((resolve, reject) => {
    db.createTable('apology', {
      id: {
        type: 'int',
        primaryKey: true,
        autoIncrement: true
      },
      title: 'string',
      note: 'text',
      user: {
        type: 'int',
        foreignKey: {
          name: 'apology_user_id_fk',
          table: 'user',
          rules: {
            onDelete: 'CASCADE'
          },
          mapping: 'id'
        }
      },
      createdAt: 'datetime',
      updatedAt: 'datetime'
    }, resolve);
  });
}
