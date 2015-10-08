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

	loadCardActivity(id) {
		return this.$http.get(this.cardUrls.loadCardActivity, {params: {id}})
		.then((response) => {
			this.contentData = response.data.content;
			return response.data || {};
		})
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




