

exports.slugify = function(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
  
  	str = str.toLowerCase();
  	// remove accents, swap ñ for n, etc
  	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  	var to   = "aaaaeeeeiiiioooouuuunc------";
  	for (var i=0, l=from.length ; i<l ; i++) {
  	  str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  	}
	
	  	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
	  	  .replace(/\s+/g, '-') // collapse whitespace and replace by -
	  	  .replace(/-+/g, '-'); // collapse dashes
	
  	return str;
}



/**
* If lading visitor from another site
*/
exports.isLandingVisitor = function(req) {
	var cookieName = sails.config.constants.cookieName;
    //si no hay cookie es landing
    if (!req.cookies[cookieName]) return true;
    
    //si el host no coincide es landing
    var regexHost = new RegExp("^(http(s)?://)?"+req.header('host')+"/.*");
    if (req.header('referer') && !req.header('referer').match(regexHost) ) return true;

    //si no, no es landing
    return false;
}

/*
* Sabe si es una nueva session
*/
exports.isNewSession = function(req) {

	console.log('lanfing' + helpers.isLandingVisitor(req));

	if (helpers.isLandingVisitor(req)) return true;

	if	(req.ctx.date < new Date().getTime() - 1000 * 60 * 30)
		{
			return true;
		}

	return false;

}

/*
* Exporta traduccione a un template del cliente
* @param res response
* @param translations : array con keys de traducciones a pedir
*/
exports.exportsTranslationsToClient = function(res, translations) {
	if (!translations || !translations.length) return "";
	
	var str = "",
		i,
		length = translations.length;

	for (i = 0; i < length; i++) {
		var item = translations[i];
		str += '"' + item + '": "' + res.i18n(item).replace(/"/g, '&quot;') + '"';
		if (i != length -1) str += ", \n"; 
	}

	return str;
}


/* 
* Generates an array of keys with prefix and numbers to pass to translations.
* Like month_0, month_1
* @param prefix: like month_
* @param start: number, by default 0
* @param end: number, by default 11, because of months
*/

function expandNumberedTranslations(prefix, start, end) {
	var i, arr = [];
	start = start || 0;
	end = end || 11;

	for (i = start; i <= end; i++) {
		arr.push(prefix + i);
	}

	return arr;
}



/* Creates a sha1 hash from any object or string
Return a 40length hexadecimal string */
var crypto = require('crypto');
exports.sha1sum = function(input){
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex');
}