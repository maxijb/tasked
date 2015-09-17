export default class Service {

	constructor($rootScope, $http) {
		/*-------------- Dependencies ------------ */
		let self = this;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.boardsData = [];
		
	}


	get boards() { 
		return this.boardsData;
	}	

	
	/* Check if user name is already taken
	@ param name : string
	@ param cb : callback receiving the status
	@ void
	@ calls event to update UI
	*/
	createBoard(data) {

		return this.$http.post("board/create", data)
		.then((response) => {
			if (response.data) {
				this.boardsData.push(response.data);
				updateBoards(this.boardsData);
			}
			return response;
		}, 
		//TODO set error behaviour
		(error) => {
			return null;
		});
	}


	


}  // - END CLASS -

	

/* --------------- Private methods ---------------- */
/* --------------- Events ---------------- */

function updateBoards(boards) {
	this.$rootScope.$broadcast("BOARDS-update", boards);
}






