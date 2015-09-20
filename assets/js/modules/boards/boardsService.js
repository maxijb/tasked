export default class Service {

	constructor($rootScope, $http, loginService) {
		/*-------------- Dependencies ------------ */
		let self = this;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.loginService = loginService;
		this.boardsData = [];
		
		this.$rootScope.$on("USER-update", this.loadBoards.bind(this));
		this.loadBoards();
	}


	get boards() { 
		return this.boardsData;
	}	

	
	/* Check if user name is already taken
	@ param data : object with board data
	@ return promise
	*/
	createBoard(data) {

		return this.$http.post("board/create", data)
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
		return this.$http.get('/board/getMine')
		.then((response) => {
			if (response && response.data) {
				this.boardsData = response.data;
				updateBoards.call(this);
			}
		});
	}


}  // - END CLASS -

	

/* --------------- Private methods ---------------- */
/* --------------- Events ---------------- */

function updateBoards() {
	this.$rootScope.$broadcast("BOARDS-update", this.boardsData);
}






