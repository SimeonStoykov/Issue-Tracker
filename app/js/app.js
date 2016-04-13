var issueTracker = angular.module('issueTracker', [
        'ngRoute',
        'angular-loading-bar',
        'ui.bootstrap.pagination'
    ])
    .config([
        '$routeProvider',
        '$httpProvider',
        function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home-dashboard.html',
                    controller: 'AuthenticationController'
                })
                .when('/projects/:id', {
                    templateUrl: 'views/project.html',
                    controller: 'ProjectsController'
                })
                .otherwise({redirectTo: '/'});

            $httpProvider.interceptors.push('httpInterceptor');
        }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('GRANT_TYPE', 'password');

