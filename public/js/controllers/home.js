spa.controller('HomeCtrl', function($scope, $http, $rootScope){
	$scope.username = $rootScope.username || "Friend";
});