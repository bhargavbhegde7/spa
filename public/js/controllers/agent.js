spa.controller('AgentRequestCtrl', function($scope, $location, $rootScope, $http, $interval, $timeout) {
    var updatedRecord = [];
    $scope.requestLengthChange = 0;
    $scope.travelRequests = [];

    var prevRequestLength = 0;
    var getAgentNotifications = function() {
        prevRequestLength = 0;
        var currRequestLength = 0;
        $http.post('/agent/getNotifications').success(function(data) {
            prevRequestLength = $scope.travelRequests.length
            updatedRecord = data;
            currRequestLength = data.length;
            $scope.requestLengthChange = currRequestLength - prevRequestLength;
            $scope.travelRequests = data;
            if ($scope.requestLengthChange > 0) {
                $('#push-notification-agent').fadeIn(2000);
                $timeout(function() {
                    $('#push-notification-agent').fadeOut(2000);
                }, 1000)
            }
        });
    }
    if ($rootScope.role === 'Agent') {
        $http.post('/agent/getNotifications').success(function(data) {
            $scope.travelRequests = data;
            console.dir($scope.travelRequests);
        });
    }
    $scope.getTravelRequests = function() {
        if ($rootScope.role === 'Agent') {
            $http.post('/agent/getNotifications').success(function(data) {
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
        $http.post('/agent/getRequest', $scope.tRequest).success(function(data) {
            $rootScope.agenttravelRequests = data;
            $location.path('/agent/showRequest');
        });
    }

    $scope.uploadTravelRequest = function(travelid) {
        $scope.tRequest = {};
        $scope.tRequest.userRole = $rootScope.role;
        $scope.tRequest.userid = $rootScope.userid;
        $scope.tRequest.travelid = travelid;
        console.dir($scope.tRequest);
        $http.post('/agent/uploadRequest', $scope.tRequest).success(function(data) {
            $location.path('/agent');
        });
    }

    $interval(getAgentNotifications, 3000);
});
