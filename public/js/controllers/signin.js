spa.controller('SigninCtrl', function($scope,$location,$http,$rootScope){
	$scope.formData = {};
	$scope.authUser = function(){
		$http.post('/signin/check', $scope.formData)
			.success(function(data){
				$rootScope.username = $scope.formData.username;
				$location.path('/');
				$scope.formData = {};
			});
	};
});