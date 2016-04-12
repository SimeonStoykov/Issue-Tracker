var issueTracker = angular.module('issueTracker', ['ngRoute', 'ngCookies'])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home-dashboard.html',
                    controller: 'HomeOrDashboardController'
                })
                .otherwise({ redirectTo: '/' });
        }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('GRANT_TYPE', 'password');

