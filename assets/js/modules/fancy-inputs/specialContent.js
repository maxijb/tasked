export default function() {
	
	var regexUrl = /((https?|ftp):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;

	return function(text) {
		
		//Replace urls
		angular.forEach(text.match(regexUrl), function(url) {

			//add http if no protocol
			var targetUrl = url.match(/^(https?|ftp|):\/\//) ? url : "http://" + url;

	        text = text.replace(url, `<a href="${targetUrl}" target="_blank">${url}</a>`);
	    });

		return text;
	}
}