spa.controller('UserCtrl', function($scope, $location, $rootScope, $http, $interval, $timeout) {
    var updatedRecord = [];
    $scope.requestLengthChange = 0;
    $scope.showForm = false;
    $scope.showNots = true;
    $scope.travelRequests = [];
    $scope.username = $rootScope.username || "Friend";
    $scope.travelRequest = {};
    $scope.currencies = [{
        label: 'Euro',
        value: 'Euro'
    }, {
        label: 'Dollar',
        value: 'Dollar'
    }, {
        label: 'INR',
        value: 'INR'
    }];

    
    var prevRequestLength = 0;
    $scope.travelRequest.userRole = $rootScope.role;
    $scope.travelRequest.userid = $rootScope.userid;
    var getEmployeeNotifications = function() {
        prevRequestLength = 0;
        var currRequestLength = 0;
        $http.post('/travel/getNotifications').success(function(data) {
            prevRequestLength = $scope.travelRequests.length
            updatedRecord = data;
            currRequestLength = data.length;
            $scope.requestLengthChange = currRequestLength - prevRequestLength;
            if ($scope.requestLengthChange > 0) {
                $('#push-notification-user').fadeIn(2000);
                $timeout(function() {
                    $('#push-notification-user').fadeOut(2000);
                }, 1000)
            }
        });


    }
    if ($rootScope.role === 'Employee') {
        $http.post('/travel/getNotifications').success(function(data) {
            $scope.travelRequests = data;
            prevRequestLength=$scope.travelRequests.length;
        });
    }
    $scope.postRequest = function() {
        $http.post('/travel/newRequest', $scope.travelRequest).success(function(data) {
            $location.path('/user');
            $scope.travelRequest = {};
        });
    };

    $scope.userNav = function(code) {
        if (code === 'request') {
            $scope.showForm = false;
            $scope.showNots = true;
            $scope.requestLengthChange = 0;
            $scope.travelRequests = updatedRecord;
            updatedRecord = [];
            getTravelRequests();
        } else if (code === 'form') {
            $scope.showForm = true;
            $scope.showNots = false;
        }
    };

    function getTravelRequests() {
        if ($rootScope.role === 'Employee') {
            $http.post('/travel/getNotifications').success(function(data) {
                $scope.travelRequests = data;

            });
        }

    }
    $scope.showTravelRequest = function(id) {
        $scope.travelRequest.userRole = $rootScope.role;
        $scope.travelRequest.userid = $rootScope.userid;
        $scope.travelRequest.travelid = id;
        $http.post('/travel/getRequest', $scope.travelRequest).success(function(data) {
            $rootScope.travelRequest = data[0];
            console.dir($rootScope.travelRequest);
            $location.path('/travel/showRequest');
        });
    }

    $interval(getEmployeeNotifications, 5000);
});
