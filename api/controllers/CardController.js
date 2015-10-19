/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let Q = require('q');
let ObjectId = require('mongodb').ObjectID;
let common = require('./commonControllerActions');

export default  {

	/* Create a new List */
	modifyCard(req, res) {

		let {id, field, value} = req.params.all();
		
		Card.findOne({id})
		.then((card) => {
			card[field] = value;
			card.save();
			common.addHistory("modifyCard", card.id, req);
			res.ok();
		})
		.catch(common.sendAndLogError.bind(res));

	},



	/* create a new card for a specified list */
	createCard(req, res) {
		let {name, description, listId} = req.params.all();

		//start by getting the list to modify
		Q.all([
			Card.create({name, description, list: listId, creator: req.W.user.id}),
			List.findOne({id: listId})
		])
		.spread((card, list) => {
			
			Activity.create({
				id: card.id
			}).then((act) => {});
			
			if (!list.cards) list.cards = [];
			list.cards.push(card.id);
			list.save();
			common.addHistory("createCard", card.id, req);
			res.send(card);
		})
		.catch(common.sendAndLogError.bind(res));

	},


	/* Move card between lists */
	moveCard(req, res) {
		let {start, end} = req.params.all();

		List.find({id: [start.targetId, end.targetId]})
		.then((lists) => {

			//get lists
			let startlist = start.targetId == lists[0].id ? lists[0] : lists[1];
			let endlist = end.targetId == lists[0].id ? lists[0] : lists[1];

			//move items
			let item = startlist.cards.splice(start.position, 1)[0];
			endlist.cards.splice(end.position, 0, item);
			
			//save start list
			startlist.save()
			
			//if different lists
			if (end.targetId != start.targetId) {
				//save second list
				endlist.save();

				// update card list
				Card.findOne({ id: item })
				.then((card) => {
					card.list = end.targetId;
				});
			}

			common.addHistory("moveCard", item, req, end.targetId);

			res.ok();
		})
		.catch(common.sendAndLogError.bind(res));
	},


	
	getActivity(req, res) {
		let id = req.param('id');
		Activity.findOne({id})
		.then((activity) => {
			res.send(activity);
		})
		.catch(common.sendAndLogError.bind(res));
	},

	createComment(req, res) {
		let {cardId, text} = req.params.all();
		let userId = req.W.user.id;
		Activity.findOrCreate({id: cardId})
		.then((activity) => {
			console.log(activity);
			if (!activity.comments) activity.comments = []; 
			
			let id = ObjectId().toString(),
				newComment = {text, user: userId, created: new Date(), id};
			
			activity.comments.push(newComment);
			activity.save();
 			common.addHistory("createComment", cardId, req, id);
			res.send(newComment);
		})

		.catch(common.sendAndLogError.bind(res));
 	},

 	deleteComment(req, res) {
 		let {cardId, commentId} = req.params.all();
 		Activity.findOne({id: cardId})
 		.then((activity) => {
 			
 			//remove comment
 			activity.comments = activity.comments.filter(x => x.id != commentId);
 			
 			//log history
 			common.addHistory("deleteComment", cardId, req, commentId);
 			activity.save();
 			res.ok();
 		})
 		.catch(common.sendAndLogError.bind(res));

 	},

 	updateComment(req, res) {
 		let {cardId, commentId, text} = req.params.all();
 		Activity.findOne({id: cardId})
 		.then((activity) => {
 			
 			//remove comment
 			let comment = activity.comments.filter(x => x.id == commentId)[0];
 			comment.text = text;
 			comment.updated = new Date();
 			
 			//log history
 			common.addHistory("updateComment", cardId, req, commentId);
 			activity.save();
 			res.ok();
 		})
 		.catch(common.sendAndLogError.bind(res));
 	}


}





