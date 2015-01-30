spa.controller('SignupCtrl', function($scope, $http, $location, $rootScope) {
    $scope.formData = {};
    $scope.changeMe = function (inputMe) {
        console.log(inputMe)
    }
    $scope.createUser = function() {
        
        if ($scope.formData.username && $scope.formData.password && $scope.formData.role) {
            $http.post('/signup/join', $scope.formData).
            success(function(data) {
                $rootScope.username = $scope.formData.username;
                $location.path('/');
            }).
            error(function(data) {
                console.log("Error : ", data);
            });
        } else {
        	alert('Enter the form correctly');
        }
    }
});
