spa.controller('AgentShowRequestCtrl', function($scope, $location, $rootScope,$http) {
	$scope.trequest={};
	$scope.trequest=$rootScope.agenttravelRequests;
	$scope.submitQuote=function(){
		$http.post('/agent/submitQuote',$scope.trequest).success(function(data){
			$scope.trequest = data;
			console.dir($scope.trequest);
			$location.path('/agent');
		});
	}

	$scope.goBack=function(){
		$location.path('/agent');
	};
	
});