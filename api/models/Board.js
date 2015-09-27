/**
* Board.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
   connection: "mongo",
   tableName: 'boards',
   migrate: 'safe',
   autoUpdatedAt: false,

  attributes: {
  	 _id: "string",
  	 users: "array",
  	 name: {
  	 	type: "STRING",
      required: true
  	 },
  	 status: {
  	 	type: "STRING",
  	 	defaultsTo: "visible"
  	 },
  	 auth: {
  	 	type: "string",
  	 	defaultsTo: "private"
  	 },
     lists: {
      type: 'array',
      defaultsTo: []
     }
  },

  beforeCreate(values, cb) {
  	if (values.childs) values.childs = values.childs.split(',');
  	cb();
  },

  beforeValidate(values, cb) {
  	cb();
  }
};

