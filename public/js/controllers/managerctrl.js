spa.controller('ManagerRequestCtrl', function($scope, $location, $rootScope,$http) {
	$http.post('/manager/getNotifications').success(function(data){
			$scope.travelRequests=data;
			console.dir($scope.travelRequests);
	});
	$scope.getTravelRequests = function(){
		$http.post('/manager/getNotifications').success(function(data){
			$scope.travelRequests=data;
			console.dir($scope.travelRequests);
		});
	}
	$scope.showTravelRequest=function(travelid){
		$scope.tRequest={};
		$scope.tRequest.userRole = $rootScope.role;
    	$scope.tRequest.userid = $rootScope.userid;
    	$scope.tRequest.travelid = travelid;
		$http.post('/manager/getRequest',$scope.tRequest).success(function(data){
			console.dir(data);
			$rootScope.mgrtravelRequests=data;
			$location.path('/manager/showRequest');
		});
	}

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
});