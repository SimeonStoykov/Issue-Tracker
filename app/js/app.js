    var issueTracker = angular.module('issueTracker', [
        'ngRoute',
        'angular-loading-bar',
        'angularUtils.directives.dirPagination',
        'ngMessages'
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
                .when('/projects/:id/edit', {
                    templateUrl: 'views/edit-project.html',
                    controller: 'ProjectsController'
                })
                .when('/issues/:id', {
                    templateUrl: 'views/issue.html',
                    controller: 'IssuesController'
                })
                .when('/logout', {
                    templateUrl: 'views/navbar.html',
                    controller: 'AuthenticationController',
                    redirectTo: '/'
                })
                .otherwise({redirectTo: '/'});

            $httpProvider.interceptors.push('httpInterceptorService');
        }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('GRANT_TYPE', 'password');

