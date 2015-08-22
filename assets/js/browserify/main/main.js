	

	
(function($) {
	
	var startup = W.modules.startup,
		load = W.modules.load,
		experiments = W.modules.experiments,
		experimentsLoad = W.modules.experimentsLoad,
		i;


	//start modules for ready
	$(document).ready(function() {
		startModules(startup, experiments);
	});

	//start modules for load 
	$(window).load(function() {
		startModules(load, experimentsLoad);
	})


	function startModules(now, firstCheck) {
		//inicia si el modulo tiene init
		//"condition" is declared on each module optionally to indicate where it should run
		//"condition" just determines where the JS runs or no, doesnt affect ABs tracking
		if (now) {
			for (i in now) {
				var module = now[i];
				// (typeof module.condition == "undefined" || module.condition == true) && module.init && module.init();
				module.condition !== false && module.condition !== 0 && module.init && module.init();	
			} 
		}


		

		//inicia si su AB esta activo y el modulo tienen init 
		if (firstCheck) {
			for (i in firstCheck) {
				var module = firstCheck[i];
				if (W.abs[i].value) {
				    module.condition !== false && module.condition !== 0 && module.init && module.init();
				 //si no esta activo el AB pero la condition es correcta inicia initElse
				} else {
					module.condition !== false && module.condition !== 0 && module.initElse && module.initElse();
				}

			}
		}
	}


})(jQuery);



 // Simple log function to keep the example simple
  window.log = function() {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }