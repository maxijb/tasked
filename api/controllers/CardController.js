/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let Q = require('q');
let ObjectId = require('mongodb').ObjectID;

export default  {

	/* Create a new List */
	modifyCard(req, res) {

		let {id, field, value} = req.params.all();
		
		Card.findOne({id})
		.then((card) => {
			card[field] = value;
			card.save();
			res.ok();
		})
		.catch(function (error) {
    		res.status(400).send({});
		});

	},



	/* create a new card for a specified list */
	createCard(req, res) {
		let {name, description, listId} = req.params.all();

		//start by getting the list to modify
		Q.all([
			Card.create({name, description, list: listId}),
			List.findOne({id: listId})
		])
		.spread((card, list) => {
			
			Activity.create({
				id: card.id, 
				history: [{
					type: 'create',
					user: req.W.user.id,
					timestamp: new Date()
				}]
			}).then((act) => {});
			
			if (!list.cards) list.cards = [];
			list.cards.push(card.id);
			list.save();
			
			res.send(card);
		})
		.catch(function (error) {
			console.log(error);
    		res.status(400).send({});
		});

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

			res.ok();
		})
		.catch((error) => { res.status(400).send({}); });
	},


	
	getActivity(req, res) {
		let id = req.param('id');
		Activity.findOne({id})
		.then((activity) => {
			res.send(activity);
		})
		.catch((error) => {
			console.error(error);
			res.status(400).send({});
		})
	},

	createComment(req, res) {
		let {cardId, text} = req.params.all();
		let userId = req.W.user.id;
		Activity.findOne({id: cardId})
		.then((activity) => {
			if (!activity.comments) activity.comments = []; 
			
			let id = ObjectId().toString(),
				newComment = {text, user: userId, created: new Date(), id};
			
			activity.comments.push(newComment);
			//log history
 			addHistory(activity, "createComment", id, req);
			activity.save();

			res.send(newComment);
		})
		.catch((e) => {
			res.status(400).send({});
		})
 	},

 	deleteComment(req, res) {
 		let {cardId, commentId} = req.params.all();
 		Activity.findOne({id: cardId})
 		.then((activity) => {
 			
 			//remove comment
 			activity.comments = activity.comments.filter(x => x.id != commentId);
 			
 			//log history
 			addHistory(activity, "deleteComment", commentId, req);
 			activity.save();
 			res.ok();
 		})
 		.catch((e) => {
			res.status(400).send({});
		})

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
 			addHistory(activity, "updateComment", commentId, req);
 			activity.save();
 			res.ok();
 		})
 		.catch((e) => {
 			console.error(e);
			res.status(400).send({});
		})
 	}


}


/* Logs history into activity */
function addHistory(activity, type, id, req) {
	activity.history.push({
		type,
		id,
		timestamp: new Date(),
		user: req.W.user.id
	})
}


