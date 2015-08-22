/**
 * parseContext
 *
 * @module      :: Policy
 * @description :: Parses url and checks if shoudl force some language
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var extend = require('util')._extend;


module.exports = function(req, res, next) {

    //checks if req.param langaugae exist and forces it 
   	req.forceLanguage = req.param('language') || null;

    next();
};