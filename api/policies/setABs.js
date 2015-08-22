/**
 * setABs
 *
 * @module      :: Policy
 * @description :: Checks if cookie defined, set all ABs in our congi list that are no assigned before
 * @requires services.helpers, config.abs
 *
 * ABs are stored and can be accesed at req.ctx.abs
 * TODO: check cookie expire and session cookie
 */

var extend = require('util')._extend


module.exports = function(req, res, next) {

	var setCookie = false,
        isNewSession = helpers.isNewSession(req),
        cookieName = sails.config.constants.cookieName,
        keys = Object.keys(sails.config.abs),
        absKeys,
        absKeysLength,
        i,
        key;


        //console.log('newsession' + isNewSession);

    // walks the cookies making sure they are set and valid
    for (i = keys.length -1; i>=0; i--) {
        key = keys[i];
        
        //si no esta la key o si es una nueva session y el valor de la key no es valido
        if (!req.ctx.abs[key] || ( isNewSession && !validABValue(key, req.ctx.abs[key]) )) {
            var ab = sails.config.abs[key];
            //console.log('pisa' + isNewSession);
            req.ctx.abs[key] = {
                value: getABValue(ab, Math.floor(Math.random() * 100)),
                track: (typeof ab[0].track == "undefined" || ab[0].track == true) 
            }
          //  console.log(req.ctx.abs[key]);
            setCookie = true;
        }
    }

    //erase from cookie deleted abtesting
    absKeys = Object.keys(req.ctx.abs);
    absKeysLength = absKeys.length;
    if (absKeysLength > keys.length) {
    //console.log(keys.length + '  ' + absKeysLength);
        for (i = absKeysLength -1; i>=0; i--) {
            if (!sails.config.abs[absKeys[i]]) delete(req.ctx.abs[absKeys[i]]);
        }
    }

 
    if (setCookie) {
        //just renew cookie date if we're setting something new
        req.ctx.date = (new Date()).getTime();
        res.cookie(cookieName, req.ctx);
    }

    overrideABFromURL(req);

    next();
};


/**
* Overrides the cookie's values fro ABs ONLY for this pageview from the url, but doesnt change the cookie
*/ 
function overrideABFromURL(req) {
    var params = req.param('abs'),
        length,
        parts,
        i;

    if (params) {

        params = params.split(';');
        length = params.length -1;

        for (i = length; i >= 0; i--) {
            parts = params[i].split('=');
            if (parts.length == 2) {
                var track = req.ctx.abs[parts[0]].track;
                req.ctx.abs[parts[0]] = {
                    value: parts[1],
                    track: track
                }
            }
        }

    }
}



/**
* Detemrines AB value acoording to this number
*/
function getABValue(ab, number) {
    var length = ab.length,
        i,
        item;

    for (i = length - 1; i >= 0; i--) {
        item = ab[i];
        if (number >= item.start && number <= item.end) return item.value;
    }
    //by defualt sets the first item value
    return ab[0].value;
}


/**
* Checks if the value is valid for this key
*/
function validABValue(key, value) {
    var ab = sails.config.abs[key],
        length = ab.length,
        i;
    for (i = length - 1; i >= 0; i--) {
        if (value == ab[i].value) return true;
    }
    return false;    
}