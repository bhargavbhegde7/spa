spa.controller('ManagerRequestCtrl', function($scope, $location, $rootScope, $http, $interval, $timeout) {
    var updatedRecord = [];
    $scope.requestLengthChange = 0;

    var prevRequestLength = 0;
    var getManagerNotifications = function() {
        prevRequestLength = 0;
        var currRequestLength = 0;
        $http.post('/manager/getNotifications').success(function(data) {
            prevRequestLength = $scope.travelRequests.length
            updatedRecord = data;
            currRequestLength = data.length;
            $scope.requestLengthChange = currRequestLength - prevRequestLength;
            $scope.travelRequests = data;
            if ($scope.requestLengthChange > 0) {
                $('#push-notification-manager').fadeIn(2000);
                $timeout(function() {
                    $('#push-notification-manager').fadeOut(2000);
                }, 1000)
            }
        });
    }
    if ($rootScope.role === 'Manager') {
        $http.post('/manager/getNotifications').success(function(data) {
            $scope.travelRequests = data;
            console.dir($scope.travelRequests);
        });
    }
    $scope.getTravelRequests = function() {
        if ($rootScope.role === 'Manager') {
            $http.post('/manager/getNotifications').success(function(data) {
                $scope.travelRequests = data;
                console.dir($scope.travelRequests);
            });
        }
    }
    $scope.showTravelRequest = function(travelid) {
        $scope.tRequest = {};
        $scope.tRequest.userRole = $rootScope.role;
        $scope.tRequest.userid = $rootScope.userid;
        $scope.tRequest.travelid = travelid;
        $http.post('/manager/getRequest', $scope.tRequest).success(function(data) {
            console.dir(data);
            $rootScope.mgrtravelRequests = data;
            $location.path('/manager/showRequest');
        });
    }

    $scope.approveTravelRequest = function(travelid) {
        $scope.tRequest = {};
        $scope.tRequest.userRole = $rootScope.role;
        $scope.tRequest.userid = $rootScope.userid;
        $scope.tRequest.travelid = travelid;
        console.dir($scope.tRequest);
        $http.post('/manager/approveRequest', $scope.tRequest).success(function(data) {
            $location.path('/manager');
        });
    }

    $scope.rejectTravelRequest = function(travelid) {
        $scope.tRequest = {};
        $scope.tRequest.userRole = $rootScope.role;
        $scope.tRequest.userid = $rootScope.userid;
        $scope.tRequest.travelid = travelid;
        console.dir($scope.tRequest);
        $http.post('/manager/rejectRequest', $scope.tRequest).success(function(data) {
            $location.path('/manager');
        });
    }

    $interval(function() {
        getManagerNotifications();
    }, 5000);
});
