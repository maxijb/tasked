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

    //sets as global object staticBaseUrl and ABs
   	req.W = extend({
   			staticBaseUrl: process.staticBaseUrl, 
   			nocompress: req.param('nocompress') || null,
   			baseUrl: req.get('host'),
   			request: {}
   	}, req.ctx);

    next();
};