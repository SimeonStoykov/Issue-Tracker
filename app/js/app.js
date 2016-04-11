var issueTracker = angular.module('issueTracker', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });
    }]);
