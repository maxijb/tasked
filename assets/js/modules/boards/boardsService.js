export default class Service {

	constructor($rootScope, $http, loginService, boardUrls, disambiguateTagsLabels) {
		/*-------------- Dependencies ------------ */
		let self = this;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.loginService = loginService;
		this.boardUrls = boardUrls;
		this.disambiguateTagsLabels = disambiguateTagsLabels;
		
		//owned data skeleton
		this.defaultState = {
			boardsData: [],
		    listsData: {
				order: [],
				details: {}
			},
			cardsData : {},
			usersData: {}
		};

		//apply defautl state to the instance
		angular.extend(this, this.defaultState);
		
		this.$rootScope.$on("USER-update", this.loadBoards.bind(this));
		this.loadBoards();
	}

	get users() {
		return this.usersData;
	}
	
	get boards() { 
		return this.boardsData;
	}	

	get lists() {
		return this.listsData;
	}

	get selectedBoard() {
		return this.selectedBoardData || null
	}

	get selectedCard() {
		return this.cardDataSelected || null;
	}	

	set selectedCard(card) {
		this.cardDataSelected = card || null;
	}


	/* Check if user name is already taken
	@ param data : object with board data
	@ return promise
	*/
	createBoard(data) {

		return this.$http.post(this.boardUrls.createBoard, data)
		.then((response) => {
			if (response.status == 200 || response.status == 201) {
				this.boardsData.push(response.data);
			}
			updateBoards.call(this);
			return response;
		}, 
		//TODO set error behaviour
		(error) => {
			return null;
		});
	}


	loadBoards() {
		if (!this.loginService.userId) {
			return this.boardsData = [];
		} 

		return this.$http.get(this.boardUrls.loadBoards)
		.then((response) => {
			if (response.status == 200 ) {
				this.boardsData = response.data;
				updateBoards.call(this);
			}
		});
	}

	/* Select board and load lists data */
	selectBoard(board) {
		
		return this.$http.get(this.boardUrls.loadBoard, {params: {boardId: board.id, withCards: true}})
			.then((response) => {
				if (response.status == 200) {
					this.listsData = {
						order: response.data.board.lists,
						details: response.data.lists
					}; 
					this.cardsData = response.data.cards;
					this.usersData = response.data.users;
					this.selectedBoardData = response.data.board;
					this.selectedBoardData.tags = this.disambiguateTagsLabels(this.selectedBoardData.tags);
				}
				updateLists.call(this);
			});
	}


	createList(data) {
		return this.$http.post(this.boardUrls.createList, {list: data, board: this.selectedBoardData})
			   .then((response) => {
			   	  if (response.status == 200 || response.status == 201) {
			   	  	 this.listsData.details[response.data.id] = response.data;
			   	  	 this.listsData.order.push(response.data.id);
			   	  }
			   })
	}

	createCard(data) {
		let params = {
			name: data.card.name,
			description: data.card.description,
			listId: data.list.id
		};

		return this.$http.post(this.boardUrls.createCard, params)
				.then((response) => {
					if (response.status == 200 || response.status == 201) {
						data.list.cards.push(response.data.id);
						this.cardsData[response.data.id] = response.data;
						return response.data;
					}
				});
	}


	moveCard(data) {
		let startList = this.listsData.details[data.start.targetId].cards;
		let item = startList.splice(data.start.position, 1);
		if (item && item.length) {
			//splice return an array, we want the first item
			item = item[0];
			let endList = this.listsData.details[data.end.targetId].cards;
			endList.splice(data.end.position, 0, item);

			//make the change on the server and return the promise
			this.$http.post(this.boardUrls.moveCard, {start: data.start, end: data.end});
		}
	}

	moveList(data) {
		let item = this.listsData.order.splice(data.start.position, 1)[0];
		this.listsData.order.splice(data.end.position, 0, item);
		this.$http.post(this.boardUrls.moveList, {boardId: this.selectedBoardData.id, start: data.start.position, end: data.end.position})
	}


	addUserToBoard(user) {
		if (typeof user == "object" && user.id && !this.usersData[user.id]) {
			this.usersData[user.id] = user;
			return this.$http.post(this.boardUrls.addUserToBoard, {board: this.selectedBoardData.id, user: user.id });
		}
	}

	removeUserFromBoard(user) {
		if (typeof user == "object" && user.id && this.usersData[user.id]) {
			delete this.usersData[user.id];
			return this.$http.post(this.boardUrls.removeUserFromBoard, {board: this.selectedBoardData.id, user: user.id });
		}
	}

	updateTags(tag, index, updateDB) {
		this.selectedBoardData.tags = this.disambiguateTagsLabels(this.selectedBoardData.tags);
		if (updateDB) this.$http.post(this.boardUrls.setTags, {id: this.selectedBoardData.id, tags: this.selectedBoardData.tags})
	}

}  // - END CLASS -

	

/* --------------- Private methods ---------------- */
/* --------------- Events ---------------- */

function updateBoards() {
	this.$rootScope.$broadcast("BOARDS-update", this.boardsData);
}


function updateLists() {
	this.$rootScope.$broadcast("LISTS-update", this.listsData, this.cardsData, this.usersData, this.selectedBoardData);
}




