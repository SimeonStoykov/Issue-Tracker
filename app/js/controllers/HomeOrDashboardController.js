issueTracker.controller('HomeOrDashboardController', [
    '$scope',
    '$controller',
    function ($scope, $controller) {
        var scope = $scope;
        var auth = false;
        if (auth) {
            return $controller('DashboardController', {$scope: scope});
        }
        return $controller('HomeController', {$scope: scope});
    }]);