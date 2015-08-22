/**
 * Name
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  adapter: 'mysql',
  tableName: 'users',
  migrate: 'safe',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  
  

  attributes: {
  	id: {
        type:"integer",
        unique: true
    },
    name: {
      type: 'STRING',
      required: 'true'
    },
    icon: 'STRING',
    signup: 'timestamp',
    email: 'email',
    
    type: 'STRING',
    native_id: "STRING",
    password: {
      type: "STRING",
      minLength: 6
    }
    
  },

  beforeCreate: function(values, cb) {
    if (values.email != values.confirmEmail) {
      return cb("invalidConfirmation");
    } 

    if (values.password) {
      values.password = helpers.sha1sum(values.password);
    }
    cb();
  },




};
