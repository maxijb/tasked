/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let common = require('./commonControllerActions');

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
		})
		.catch(common.sendAndLogError.bind(res));
	},


	/* get all List for a board */
	loadBoard(req, res) {
		let boardId = req.param('boardId');
		let response = {
			order: [],
			details: {},
			cards: {},
			users: {}
		};
		
		Board.findOne({id: boardId})
		.then((board) => {
			response.order = board.lists;
			return [
				List.find({id: board.lists}),
				Card.find({list: board.lists}),
				User.find({id: board.users.map((x) => x.id)})
			];
		})	
		.spread((details, cards, users) => {
			details.map((list) => response.details[list.id] = list );
			cards.map((card) => response.cards[card.id] = card );
			users.map((user) => { 
				response.users[user.id] = {
					id: user.id,
					name: user.name || user.showName,
					icon: user.icon
				} 
			});
			
			res.send(response);
		})
		.catch(common.sendAndLogError.bind(res));	
	},

	
	addUser(req, res) {
		let {board, user} = req.params.all();
		Board.findOne({id: board})
		.then(board => {
			let found = board.users.filter(x => x.id == user);
			if (!found.length) {
				board.users.push({id: user, type: "editor"});
				board.save();
			}
			res.ok();
		})
		.catch(common.sendAndLogError.bind(res));
	},

	removeUser(req, res) {
		let {board, user} = req.params.all();
		Board.findOne({id: board})
		.then(board => {
			let size = board.users.length;

			board.users.map((x, index) => { 
				if (x.id == user) { 
					board.users.splice(index, 1);  
				}
			});
			
			if (board.users.length != size) {
				board.save();
				return res.ok();
			}
			res.status(400).send({});
		})
		.catch(common.sendAndLogError.bind(res));
	}

  
};
