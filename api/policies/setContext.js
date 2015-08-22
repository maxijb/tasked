/**
 * setContext
 *
 * @module      :: Policy
 * @description :: Checks if cookie defined, force langugae defined and saves cookie if needed
                   Sets req.ctx, context for the rest of the action
 *
 */

var extend = require('util')._extend;


module.exports = function(req, res, next) {


	var setCookie = false,
        date = new Date(),
        cookieName = sails.config.constants.cookieName;

    if (req.cookies[cookieName]) {
        req.ctx = req.cookies[cookieName];
    } else {
    	//if no cookie set default and flag to save it
    	req.ctx = extend({}, sails.config.constants.defaultCtx);
    	setCookie = true;
    }

    //if language has been forced we change the context
    if (req.forceLanguage) {
    	setCookie = true;
    	req.ctx.lang = req.forceLanguage;
    }

    req.ctx.currentMonth = date.getMonth();
    
    //save the locales and the cookie if needed
    req.language = req.locale = req.ctx.lang;

    if (setCookie) {
        //just renew cookie date if we're setting something new
        req.ctx.date = date.getTime();
        res.cookie(cookieName, req.ctx);
    }
    next();
};