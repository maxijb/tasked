export default angular.module('constants', [])
.constant('defaultIcons', {
	user: '/static/images/default-user-icon.png',
	organization: '/static/images/default-user-icon.png'
})
.constant('loginUrls', {
	logout: '/user/logout',
	login: '/user/login',
	signup: '/user/signup',
	checkUserName: '/user/checkName',
	signup3rdParty: '/user/signup3rdParty',
	createOrganization: '/organization/create',
	loadOrganizations: '/organization/getMine'



})
.constant('boardUrls', {
	createList: '/list/create',
	createBoard: '/board/create',
	loadBoards: '/board/getMine',

	loadLists: '/list/getAll/',
	createCard: '/list/createCard',
	moveCard: '/list/moveCard',
	moveList: '/list/moveList' 
		
})
.constant('cardUrls', {
	loadCard: '/card/get'
})