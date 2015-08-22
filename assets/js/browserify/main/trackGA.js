(function($) {
	
	W.track = {
		

		event: function() {
			//TODO: actually track in GA. Use hitcallback for outbound links
		},

		ab: function(ab_name) {
			var ctx = W.helpers.cookies.decodeCookie($.cookie('w_ctx'));
			if (ctx.abs[ab_name]) ctx.abs[ab_name].track = 1
			$.cookie('w_ctx', W.helpers.cookies.encodeCookie(ctx));
			W.track.abs(ctx);
		},

		abs: function(_cookie) {
			//can receive or use the cookie in memory
			var cookie = _cookie || W.helpers.cookies.decodeCookie($.cookie('w_ctx')),
				toTrack = "";
			for (var i in cookie.abs) {
				if (cookie.abs[i].track) {
					toTrack += i+":"+ cookie.abs[i].value+";"
				}
			}
			console.log(toTrack);
			//TODO: actually track in GA
		}
	}


	W.modules.startup.track_ab_on_init = {
		init: W.track.abs
	}


})(jQuery);