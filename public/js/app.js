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
    when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
    }).
    when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
    }).
    when('/travel/showRequest', {
        templateUrl: 'views/showrequest.html',
        controller: 'ShowRequestCtrl'
    }).
    when('/agent', {
        templateUrl: 'views/agent.html',
        controller: 'AgentRequestCtrl'
    }).
    when('/agent/showRequest', {
        templateUrl: 'views/showagentrequest.html',
        controller: 'AgentShowRequestCtrl'
    });
    
}]);

spa.controller('MainCtrl', function($scope, $location, $rootScope){
	$rootScope.username = "Friend";
    $scope.isActive = function (urlLocation) {
		return urlLocation === $location.path();
	}
});
