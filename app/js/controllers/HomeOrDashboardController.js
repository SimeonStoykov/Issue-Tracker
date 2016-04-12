issueTracker.controller('HomeOrDashboardController', [
    '$scope',
    '$controller',
    'identity',
    function HomeOrDashboardController($scope, $controller, identity) {
        var scope = $scope;

        if(identity.isAuthenticated()){
            return $controller('DashboardController', {$scope: scope});
        }
        return $controller('HomeController', {$scope: scope});
    }
]);