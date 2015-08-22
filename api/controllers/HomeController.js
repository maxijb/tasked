/**
 * NameController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */



	

module.exports = { 
    
  

	index : function(req, res) {
  		
		req.W.request.action = 'index';
		// if (req.W.user) {
		// 	res.redirect('/dashboard');
		// }
		// req.W.user = {name: "Maximiliano BEnedetto"};
		res.view({ W: req.W });
	},


	tweets_index: function(req, res) {
		req.W.request.action = 'tweets_index';
		res.view({W: req.W});
	},

	dashboard: function(req, res) {
		if (!req.W.user) {
			res.redirect('/');
		} else {
			req.W.request.action = 'dashboard';
								res.view({W: req.W});

			// Tag.find({user_id: req.W.user.id})
			// 	.then(function(tags) {
			// 		res.view({W: req.W, 
			// 				  data: {tags: tags},
			// 				  loginComponent: '',//reactHelpers.render(loginComponent, {user: req.W.user}, res), 
			// 				  tagsContainer: ''//reactHelpers.render(tagsContainer, {tags: tags}) 
			// 				});
			// 	});
			
		}
	},

	vista: function(req, res) { 
		res.view({W: req.W, layout: null});
	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to NameController)
   */
  _config: {}

  
};