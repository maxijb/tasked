/* Constants for the site
*
* Avialibale sails.config.constants.author
*/

module.exports.constants = {
    name: 'weather',
    author: 'mbenedetto',

    // default context for the app
    defaultCtx : {lang: 'en', unit: 'c', abs: {}, events: { sh: [] } },

    // cookie name where we'll store the session information
	cookieName : 'w_ctx',

	// possible languages
	languages : ['es', 'en', 'pt']

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