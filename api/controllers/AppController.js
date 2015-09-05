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



	

export default  {
    
  

	dashboard(req, res) {

		console.log("APPP");
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
			
	},

	


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to NameController)
   */
  _config: {}

  
};