spa.controller('ManagerShowRequestCtrl', function($scope, $location, $rootScope,$http) {
	$scope.mrequest={};
	$scope.mrequest=$rootScope.mgrtravelRequests;
	console.dir($rootScope.mgrtravelRequests);
	$scope.approveTravelRequest=function(travelid){
		$scope.tRequest={};
		$scope.tRequest.userRole = $rootScope.role;
    	$scope.tRequest.userid = $rootScope.userid;
    	$scope.tRequest.travelid = travelid;
    	console.dir($scope.tRequest);
		$http.post('/manager/approveRequest',$scope.tRequest).success(function(data){
			$location.path('/manager');
		});
	}
	$scope.rejectTravelRequest=function(travelid){
		$scope.tRequest={};
		$scope.tRequest.userRole = $rootScope.role;
    	$scope.tRequest.userid = $rootScope.userid;
    	$scope.tRequest.travelid = travelid;
    	console.dir($scope.tRequest);
		$http.post('/manager/rejectRequest',$scope.tRequest).success(function(data){
			$location.path('/manager');
		});
	}

	$scope.goBack=function(){
		$location.path('/manager');
	}
});