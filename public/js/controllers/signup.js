spa.controller('SignupCtrl', function ($scope, $http, $location, $rootScope){
	$scope.formData = {};
	$scope.createUser = function () {
		$http.post('/signup/join', $scope.formData).
			success(function (data) {
				$rootScope.username = $scope.formData.username;
				$scope.formData = {};
				$location.path('/');
			}).
			error(function (data) {
				console.log("Error : ",data);
			});
	}
});
