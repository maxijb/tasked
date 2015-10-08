/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let Q = require('q');


export default  {

	/* Create a new List */
	create(req, res) {

		let {board, list} = req.params.all();
		
		Q.all([
			Board.findOne({id: board.id}),
			List.create(list)
		])
		.spread((_board, _list) => {
			
			if (!_board || !_list) return res.status(400).send({});

			if (!_board.lists) _board.lists = [];
			_board.lists.push(_list.id);
			_board.save();
			res.send(_list);
		})
		.catch(function (error) {
    		res.status(400).send({});
		})

	},

	/* get all List for a board */
	getAll(req, res) {
		let boardId = req.param('boardId');
		let withCards = req.param('withCards');
		let response = {
			order: [],
			details: {}
		};
		
		Board.findOne({id: boardId})
		.then((board) => {
			response.order = board.lists;
			return [
				List.find({id: board.lists}),
				withCards ? Card.find({list: board.lists}) : null
			];
		})	
		.spread((details, cards) => {
			details.map((list) => response.details[list.id] = list );
			if (cards) {
				response.cards = {};
				cards.map((card) => response.cards[card.id] = card );
			}
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
    		res.status(400).send({});
		});
	},


	moveList(req, res) {
		let {start, end, boardId} = req.params.all();

		Board.findOne({id: boardId})
		.then((board) => {
			let item = board.lists.splice(start, 1)[0];
			board.lists.splice(end, 0, item);
			board.save();
			res.ok();
		});

	}


}



