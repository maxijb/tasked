export default class Service {

	constructor($rootScope, $http, loginService, boardUrls) {
		/*-------------- Dependencies ------------ */
		let self = this;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.loginService = loginService;
		this.boardUrls = boardUrls;
		
		//owned data skeleton
		this.defaultState = {
			boardsData: [],
		    listsData: {
				order: [],
				details: {}
			}
		};

		//apply defautl state to the instance
		angular.extend(this, this.defaultState);
		
		this.$rootScope.$on("USER-update", this.loadBoards.bind(this));
		this.loadBoards();
	}


	get boards() { 
		return this.boardsData;
	}	

	get lists() {
		return this.listsData;
	}

	
	/* Check if user name is already taken
	@ param data : object with board data
	@ return promise
	*/
	createBoard(data) {

		return this.$http.post(this.boardUrls.createBoard, data)
		.then((response) => {
			if (response.data) {
				this.boardsData.push(response.data);
				updateBoards.call(this);
			}
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
			if (response && response.data) {
				this.boardsData = response.data;
				updateBoards.call(this);
			}
		});
	}

	/* Select board and load lists data */
	selectBoard(board) {
		debugger;
		this.selectedBoard = board;
		return this.$http.get(this.boardUrls.loadLists, {params: {boardId: board.id}})
			.then((response) => {
				if (response && response.data) {
					this.listsData = response.data; 
				}
				updateLists.call(this);
			});
	}


	createList(data) {
		return this.$http.post(this.boardUrls.createList, {list: data, board: this.selectedBoard})
			   .then((response) => {
			   	  if (response && response.data) {
			   	  	 this.listsData.details[response.data.id] = response.data;
			   	  	 this.listsData.order.push(response.data.id);
			   	  }
			   	  updateLists.call(this);
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
					if (response && response.data) {
						debugger;
						data.list.cards.push(response.data);
						return response.data;
					}
				});
	}


	moveCard(data) {
		debugger;
		let startList = this.listsData.details[data.start.listId].cards;
		let item = startList.splice(data.start.position, 1);
		if (item && item.length) {
			//splice return an array, we want the first item
			item = item[0];
			let endList = this.listsData.details[data.end.listId].cards;
			endList.splice(data.end.position, 0, item);
			updateLists.call(this);

			let _this = this;
			//make the change on the server and return the promise
			_this.$http.post(_this.boardUrls.moveCard, {start: data.start, end: data.end})
			// .then(() => {
			// 	updateLists.call(_this);
			// });

			// .then((response) => {
			// 	return this.listsData;
			// },
			// (response) => {
			// 	//error
			// 	return "error";
			// });
		}
	}

}  // - END CLASS -

	

/* --------------- Private methods ---------------- */
/* --------------- Events ---------------- */

function updateBoards() {
	this.$rootScope.$broadcast("BOARDS-update", this.boardsData);
}


function updateLists() {
	this.$rootScope.$broadcast("LISTS-update", this.listsData);
}




