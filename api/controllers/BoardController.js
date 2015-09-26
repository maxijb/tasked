/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

export default  {

	getMine(req, res) {
		
		let user = req.W.user;

		if (!user) return res.send([]);
		//get ids for user
		
		let ids = [{id: user.id}].concat(user.organizationsDetails);
		let	idSet = { };

		//map ids to a set
		ids.map((x) => idSet[x.id] = 1);

		//find board with those ids
		Board.find().where({"users.id": Object.keys(idSet)})
		.then((boards) => {

			//filter the ids concerning only this user and his orgs
			boards.map((board) => {
				board.users = board.users.filter((user) => !!idSet[user.id]);
			});

			//sed the boards
			res.send(boards)
		},
		(err) => {
			//send empty list if error
			console.error(err);
			res.send([]);
		});
	}

	


  
};
