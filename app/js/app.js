var issueTrackerApp = angular.module('issueTracker', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'views/register.html',
            controller: 'MainController'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }]);
