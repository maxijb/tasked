export default class Service {

	constructor($rootScope, $http, loginService, cardUrls) {
		/*-------------- Dependencies ------------ */
		let self = this;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.loginService = loginService;
		this.cardUrls = cardUrls;
	
		this.cardData = null;

	}


	get card() {
		return this.cardData;
	}


	loadCard(card) { 
		return this.$http.get(this.cardUrls.loadCard, {params: {id: card.id}})
		.then((response) => {
			if (response && response.data) {
				this.cardData = response.data;
				return this.cardData;
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




