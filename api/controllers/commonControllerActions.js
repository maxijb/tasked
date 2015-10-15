export default {
	
	/* Logs history into DB */
	addHistory(type, primaryId, req, secondaryId, description) {
		let toSave = {type, primaryId, user: req.W.user.id};
		if (secondaryId) toSave.secondaryId = secondaryId;
		if (description) toSave.description = description;
		History.create(toSave).exec(function() {});
	},


	/* Retruns a 400 response and logs error */
	/* 'this' should be bound to res */
	sendAndLogError(error) {
		console.error(error);
		if (this.status) {
			this.status(400).send({});
		} else {
			console.error("Additionally, sendAndLogError shoudl be bound to a 'res' object")
		}
	}
}