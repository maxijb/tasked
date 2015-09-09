/**
 * Name
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

export default  {
  
  connection: "mongo",
  tableName: 'users',
  migrate: 'safe',
  autoPK: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  
  

  attributes: {
    
  	name: {
      type: 'STRING',
      required: true
    },
    icon: 'STRING',
    signup: 'DATETIME',
    email: {
      type: 'email'
    },
    
    type: 'STRING',
    native_id: "array",
    password: {
      type: "STRING",
      minLength: 6
    }
    
  },

  beforeCreate(values, cb) {

    if (values.type == 'user' && !values.email) {
      return cb("mandatoryEmail");
    }
    
    if (!values.native_id && values.email && values.email != values.confirmEmail) {
      return cb("invalidConfirmation");
    } 


    delete(values.confirmEmail);
    delete(values.id);

    if (values.password) {
      values.password = helpers.sha1sum(values.password);
    }
    cb();
  }




};
