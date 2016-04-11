var issueTracker = angular.module('issueTracker', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: function () {
                    var authorized = false;
                    if (authorized) {
                        return 'views/dashboard.html';
                    }
                    return 'views/home.html';
                },
                controller: 'HomeOrDashboardController'
            })
            .otherwise({ redirectTo: '/' });
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('GRANT_TYPE', 'password');

