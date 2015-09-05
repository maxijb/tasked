
let root = process.cwd();

jest.dontMock(root + '/.tmp/public/static/js/modules/login/controllerES6');
var Controller = require(root+'/.tmp/public/static/js/modules/login/controllerES6'); 



describe('LoginController tests', () => {
    
    //dependencies
    let service = require(root+'/.tmp/public/static/js/modules/login/service'); 
    let loginService = new service();
    let $rootScope = {'$on': function(){}},
        $scope = {};
    
    //Initialize controller
    let ctrl = new Controller($scope, $rootScope, loginService);

        it('sets up instance properties correctly in the constructor', () => {
            expect(ctrl.$scope.visible).toBeFalsy();
        });

        it('Toggle popup', () => {
            ctrl.togglePopup();

            expect(ctrl.$scope.popup.visible).toBeTruthy();
        })

        it('Create form method, show popup and call service to createUser', () => {
            spyOn(loginService, 'createUser');
            ctrl.createForm();

            expect(ctrl.$scope.popup.loading).toBeTruthy();
            expect(loginService.createUser).toHaveBeenCalledWith(ctrl.$scope.form);
        });
});