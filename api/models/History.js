/**
* Content.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: "mongo",
  tableName: 'history',
  migrate: 'safe',
  autoPK: true,
  autoUpdatedAt: false,

  attributes: {
    
    type: 'string',
    primaryId: 'string',  //mostly card id
    secondaryId: 'string', //mostly list id
    description: 'string',
    user: 'string'
    
  }
};