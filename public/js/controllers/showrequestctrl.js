spa.controller('ShowRequestCtrl', function($scope, $location, $rootScope,$http) {
	$scope.trequest={};
	$scope.trequest=$rootScope.travelRequest;
	console.dir($scope.trequest);	
});