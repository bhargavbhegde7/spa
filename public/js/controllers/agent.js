spa.controller('AgentRequestCtrl', function($scope, $location, $rootScope,$http) {
	$scope.travelRequests=[];
	$http.post('/agent/getNotifications').success(function(data){
			$scope.travelRequests=data;
			console.dir($scope.travelRequests);
	});
	$scope.getTravelRequests = function(){
		$http.post('/agent/getNotifications').success(function(data){
			$scope.travelRequests=data;
			console.dir($scope.travelRequests);
		});
	}

	$scope.showTravelRequest=function(travelid){
		$scope.tRequest={};
		$scope.tRequest.userRole = $rootScope.role;
    	$scope.tRequest.userid = $rootScope.userid;
    	$scope.tRequest.travelid = travelid;
		$http.post('/agent/getRequest',$scope.tRequest).success(function(data){
			$rootScope.agenttravelRequests=data;
			$location.path('/agent/showRequest');
		});
	}

	$scope.uploadTravelRequest=function(travelid){
		$scope.tRequest={};
		$scope.tRequest.userRole = $rootScope.role;
    	$scope.tRequest.userid = $rootScope.userid;
    	$scope.tRequest.travelid = travelid;
    	console.dir($scope.tRequest);
		$http.post('/agent/uploadRequest',$scope.tRequest).success(function(data){
			$location.path('/agent');
		});
	}

});