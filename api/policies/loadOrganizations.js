/**
 * parseContext
 *
 * @module      :: Policy
 * @description :: Loads all organizations for the current user, if exists
 * @docs        :: http://sailsjs.org/#!documentation/policies
 * TODO: get organizations from session cache, not DB
 */

var extend = require('util')._extend;


module.exports = function(req, res, next) {
	console.log('pasa');
	try {
			User.find({
				"users.id": req.W.user.id 
			})
			.then((orgs) => {
				req.W.user.organizationsDetails = orgs;
				next();
			},
			(err) => {
				console.log(err);
				next();
			});
	} catch (e) {
		console.error(e);
		next();
	}
};