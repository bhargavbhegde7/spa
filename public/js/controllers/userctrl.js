spa.controller('UserCtrl', function($scope, $location, $rootScope,$http) {
    $scope.showForm = false;
    $scope.showNots = true;
    $scope.travelRequests=[];
    $scope.username = $rootScope.username || "Friend";
    $scope.travelRequest={};
    $scope.currencies = [
    	{label : 'Euro', value:'Euro'},
    	{label : 'Dollar', value:'Dollar'},
    	{label : 'INR', value:'INR'}
    ]

    $scope.travelRequest.userRole = $rootScope.role;
    $scope.travelRequest.userid = $rootScope.userid;
    $scope.postRequest=function(){
    	$http.post('/travel/newRequest',$scope.travelRequest).success(function(data) {

    	});
    };

    $scope.userNav = function (code) {
    	if(code === 'request') {
    		$scope.showForm = false;
    		$scope.showNots = true;
    		getTravelRequests();
    	} else if (code === 'form') {
    		$scope.showForm = true;
    		$scope.showNots = false;  		
    	} 
    };
	function getTravelRequests(){
		$http.post('/travel/getNotifications').success(function(data) {
			$scope.travelRequests=data;

		});
	}    
	$scope.showTravelRequest=function(id){
		$scope.travelRequest.userRole = $rootScope.role;
    	$scope.travelRequest.userid = $rootScope.userid;
    	$scope.travelRequest.travelid = id;
		$http.post('/travel/getRequest',$scope.travelRequest).success(function(data){
			$rootScope.travelRequest=data[0];
			console.dir($rootScope.travelRequest);
			$location.path('/travel/showRequest');
		});
	}
});

