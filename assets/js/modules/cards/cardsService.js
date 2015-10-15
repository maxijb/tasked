export default class Service {

	constructor($rootScope, $http, loginService, cardUrls) {
		/*-------------- Dependencies ------------ */
		let self = this;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.loginService = loginService;
		this.cardUrls = cardUrls;
	
		//store data from card and list
		// this.cardData = null;
		// this.listsData = null;
		this.contentData = {};
	}


	get content() {
		return this.contentData;
	}

	selectCard(card, notLoad) {
		this.cardData = card;
		return notLoad ? {} : this.loadCardActivity(card.id);
	}

	loadCardActivity(id) {
		return this.$http.get(this.cardUrls.loadCardActivity, {params: {id}})
		.then((response) => {
			if (response.status == 200) {
				this.contentData = {
					history: response.data.history || [],
					comments: response.data.comments || []
				}
			}

			return this.contentData;
		})
	}


	/* Modify one field of the card, doesnt do with content or activity, just members belonging to card Model 
	   @param doNotUpdate: specifies wheter the value should NOT be update in the model
	*/
	modifyCard(id, field, value, doNotUpdate) {
		
		let oldValue = this.cardData[field];
		if (!doNotUpdate) this.cardData[field] = value; 

		return this.$http.post(this.cardUrls.modifyCard, {id, field, value})
		.then((response) => {
			if (response.status !== 200 && !doNotUpdate) {
				//TODO notify errors
				this.cardData[field] = oldValue;
			} 
		});
	}

	/** Adds a comment to the selected card's list */ 
	createComment(card, comment) {
		
		return this.$http.post(this.cardUrls.createComment, {
			cardId: card.id,
			text: comment.text
		}).then((response) => {
			if (response.status == 200 || response.status == 201) {
				card.comments.push(response.data);
				return response.data;
			}
		});
	}


	deleteComment(card, comment) {
		card.comments = card.comments.filter(x => x.id != comment.id);
		return this.$http.post(this.cardUrls.deleteComment, {
			cardId: card.id,
			commentId: comment.id
		})
		.then((response) => {
			if (response.status == 200) {
				return response.data;
			}
		})
	}


	updateComment(card, comment, text) {
		
		return this.$http.post(this.cardUrls.updateComment, {
			cardId: card.id,
			commentId: comment.id,
			text
		})
		.then((response) => {
			if (response.status == 200) {
				return response.data;
			}
		})
	}

	addUserToCard(card, user) {
		let exists = card.users.filter(x => x == user.id);
		if (!exists.length) {
			card.users.push(user.id);
			this.modifyCard(card.id, 'users', card.users, true); 
		}
	}

	removeUserFromCard(card, userId) {
		for (let i = 0; i < card.users.length; i++) {
			if (card.users[i] == userId) {
				card.users.splice(i, 1);
				this.modifyCard(card.id, 'users', card.users, true); 
			}
		}
	}

}  // - END CLASS -

	

/* --------------- Private methods ---------------- */
/* --------------- Events ---------------- */

// function updateBoards() {
// 	this.$rootScope.$broadcast("BOARDS-update", this.boardsData);
// }


// function updateLists() {
// 	this.$rootScope.$broadcast("LISTS-update", this.listsData);
// }




