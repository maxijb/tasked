/**
 * ContentController
 *
 * @description :: Server-side logic for managing contents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let Q = require('q');

export default  {

	getFromCard(req, res) {
		let {id, details} = req.params.all(),
			promises = [Content.findOne({id: id})];

		if (details) {
			promises.push(List.findOne({"cards.id": id}));
		}

		Q.all(promises)
		.spread((content, list) => {
			let response = { content };
			if (list && details) {
				response.list = list;
				//find out card in the list
				let filteredCards = list.cards.filter((x) => x.id == id);
				response.card = filteredCards && filteredCards.length ? filteredCards[0] : {};
			}
			res.send(response);
		},
		(error, err2) => {
			res.status(400).send({});
		});

	}
};

