    var issueTracker = angular.module('issueTracker', [
        'ngRoute',
        'angular-loading-bar',
        'angularUtils.directives.dirPagination'
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
                .when('/issues/:id', {
                    templateUrl: 'views/issue.html',
                    controller: 'IssuesController'
                })
                .otherwise({redirectTo: '/'});

            $httpProvider.interceptors.push('httpInterceptorService');
        }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('GRANT_TYPE', 'password');

