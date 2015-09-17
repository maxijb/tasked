export default class Service {

	constructor($rootScope, $http, loginService) {
		/*-------------- Dependencies ------------ */
		let self = this;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.loginService = loginService;
		this.boardsData = [];
		
		this.$rootScope.$on("USER-update", this.loadBoards);
		this.loadBoards();
		console.log("MAKMXKM");
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


	loadBoards(user) {
		let ids = this.loginService.identities.map((x) => x.id);
		this.$http.get('/board/getAll?users=' + ids.toString())
		.then((response) => {
			if (response && response.data) {
				this.boardsData = response.data;
			}
		});
	}


}  // - END CLASS -

	

/* --------------- Private methods ---------------- */
/* --------------- Events ---------------- */

function updateBoards(boards) {
	this.$rootScope.$broadcast("BOARDS-update", this.boardsData);
}






