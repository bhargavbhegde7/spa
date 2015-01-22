var spa = angular.module('spaApp', ['ngRoute']);

spa.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    }).
    when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
    }).
    when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })
}]);

spa.controller('MainCtrl', function($scope, $location, $rootScope){
	$rootScope.username = "Friend";
    $scope.isActive = function (urlLocation) {
		return urlLocation === $location.path();
	}
});
