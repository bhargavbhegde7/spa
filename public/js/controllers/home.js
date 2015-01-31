/***
 *  Home Controller
 *  Routes sign in and sign up pages
 *
 */

spa.controller('HomeCtrl', function($scope, $location, $rootScope, $http) {
    $scope.formData = {};
    $scope.errmsg = "";
    $scope.username = $rootScope.username || "Friend";
    $scope.routeUser = function(code) {
        $location.path(code);
    }
    $scope.authUser = function() {
        $http.post('/signin/check', $scope.formData).
            success(function(data) {
                if(data.error){
                    $scope.errmsg = data.error;
                    return
                }
                $rootScope.username = data.username;
                $rootScope.role = data.role;
                $rootScope.userid = data.userid;
                $scope.username = $rootScope.username;
                if ($rootScope.role === 'Employee') {
                    $location.path('/user');
                } else if ($rootScope.role === 'Manager') {
                    $location.path('/manager');
                } else if ($rootScope.role === 'Agent') {
                    $location.path('/agent');
                } else {
                    $location.path('/');
                }
            }).
            error(function() {
                console.log(12312321)
            });;
    };
});
