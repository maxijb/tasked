/*
* Behavior for index action
*/
var dashboardApp = require("./../../modules/apps/dashboard");

W.modules.startup.dashboard_action = (function($) { 

	

		var init = function() {



		}


	return {
		init: init, 
		condition: (W.request.action == 'dashboard')
	};


})(jQuery);



