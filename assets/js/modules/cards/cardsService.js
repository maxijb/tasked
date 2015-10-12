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

	// loadCard(id) { 
	// 	return this.$http.get(this.cardUrls.loadCard, {params: {id}})
	// 	.then((response) => {
	// 		if (response && response.data) {
	// 			this.cardData = response.data;
	// 			return this.cardData;
	// 		}
	// 	});
	// }	

	// selectCard(card, list) {
	// 	console.log('selectcard', card, list);
	// 	this.cardData = card;
	// 	this.listsData = list;

	// }

	/* Select the card as selected, then load the activity unless you specify not.
		Returns the promise to load the activity, or an empty object if nothing needs to be loaded
	*/ 

	selectCard(card, notLoad) {
		this.cardData = card;
		return notLoad ? {} : this.loadCardActivity(card.id);
	}

	loadCardActivity(id) {
		return this.$http.get(this.cardUrls.loadCardActivity, {params: {id}})
		.then((response) => {
			this.contentData = response.data.content;
			return response.data || {};
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

}  // - END CLASS -

	

/* --------------- Private methods ---------------- */
/* --------------- Events ---------------- */

// function updateBoards() {
// 	this.$rootScope.$broadcast("BOARDS-update", this.boardsData);
// }


// function updateLists() {
// 	this.$rootScope.$broadcast("LISTS-update", this.listsData);
// }




