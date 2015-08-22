/*
* Compiles i18n texts on jade templates
* jade calls the __ function which searches on global tranlation object
* and interpolates %s if arguments.lenght > 1 
*/

(function(translations) {

	translations = translations || {};

	window.__ = function() {
		var args = Array.prototype.slice.call(arguments),
			//base text is traslated text, or simply received text or nothing
			str = translations[args[0]] || args[0] || '',
			length = args.length,
			i;

		//for every extra parameter try to replace %s
		for (i = 1; i < length; i++) {
			str = str.replace('%s', args[i]);
		}

		return str;

	}

})(W.trans);