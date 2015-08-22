/*
* Behavior for index action
*/


W.modules.startup.dashboard_action = (function($) { 

	

		init = function() {



		}


	return {
		init: init, 
		condition: (W.request.action == 'dashboard')
	};


})(jQuery);



