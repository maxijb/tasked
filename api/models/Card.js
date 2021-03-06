/**
* Content.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: "mongo",
  tableName: 'card',
  migrate: 'safe',
  autoPK: true,
  autoUpdatedAt: false,

  attributes: {
    name: 'string',
    description: 'string',
    tags: {
      type: 'array',
      defaultsTo: []
    },
    flags: {
      type: 'array',
      defaultsTo: []
    },
  	elements: {
  		type: 'array',
  		defaultsTo: []
  	},
    users: {
      type: 'array',
      defaultsTo: []
    }
  }
};

