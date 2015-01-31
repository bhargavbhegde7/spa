spa.controller('LogoutCtrl', function($scope, $location, $rootScope, $http) {
	$rootScope.username = "Friend";
    $rootScope.role = "";
    $rootScope.userid = "";
    $location.path('/');
});