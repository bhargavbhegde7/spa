/***
 *	Home Controller
 *	Routes sign in and sign up pages
 *
 */

spa.controller('HomeCtrl', function($scope, $location, $rootScope) {
    $scope.username = $rootScope.username || "Friend";
    $scope.routeUser = function(code) {
        $location.path(code);
    }
});
