/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

export default  {

	/* Create a new List */
	create(req, res) {

		let {board, list} = req.params.all();
		
		Board.findOne({id: board.id})
		.then((found) => {
			board = found;
			if (!board.lists) board.lists = [];
			return List.create(list);
		})
		.then((list) => {
			board.lists.push(list.id);
			board.save();
			res.send(list);
		})

	},

	/* get all List for a board */
	getAll(req, res) {
		let boardId = req.param('boardId');
		let response = {
			order: [],
			details: {}
		};
		
		Board.findOne({id: boardId})
		.then((board) => {
			response.order = board.lists;
			return List.find({id: board.lists});
		})	
		.then((details) => {
			details.map((list) => response.details[list.id] = list );
			res.send(response);
		});
	},

	/* create a new card for a specified list */
	createCard(req, res) {
		let {name, description, listId} = req.params.all();

		//start by getting the list to modify
		List.findOne({id: listId})
		.then((list) => {

			//get the content id
			let content = list ? Content.create({}) : null;
			return [list, content]
		})
		.spread((list, content) => {
			if (list && content) {
				if (!list.cards) list.cards = [];
				let card = {
					id: content.id,
					name,
					description
				};
				list.cards.push(card);
				list.save();
				res.send(card);
			} else {
				res.send({});
			}
		});


	}


}
