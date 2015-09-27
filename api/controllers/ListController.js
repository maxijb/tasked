/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

export default  {

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
	}


}
