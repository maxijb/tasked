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



