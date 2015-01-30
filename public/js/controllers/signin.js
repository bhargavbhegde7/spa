spa.controller('SigninCtrl', function($scope,$location,$http,$rootScope){
	$scope.formData = {};
	$scope.authUser = function(){
		$http.post('/signin/check', $scope.formData)
			.success(function(data){
				$rootScope.username = data.username;
				$rootScope.role=data.role;
				$rootScope.userid=data.userid;
				$location.path('/');
				$scope.formData = {};
			});
	};
});