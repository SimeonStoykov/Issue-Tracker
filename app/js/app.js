'use strict';
var issueTracker = angular.module('issueTracker', [
        'ngRoute',
        'angular-loading-bar',
        'angularUtils.directives.dirPagination',
        'ui.bootstrap'
    ])
    .config([
        '$routeProvider',
        '$httpProvider',
        function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home-dashboard.html',
                    controller: 'AuthenticationController',
                    access: {
                        requiresAuthentication: false
                    }
                })
                .when('/projects/:id', {
                    templateUrl: 'views/view-project.html',
                    controller: 'ViewProjectController',
                    access: {
                        requiresAuthentication: true
                    }
                })
                .when('/projects/:id/edit', {
                    templateUrl: 'views/edit-project.html',
                    controller: 'EditProjectController',
                    access: {
                        requiresAuthentication: true,
                        requiresAdminOrLead: true
                    }
                })
                .when('/projects/:id/add-issue', {
                    templateUrl: 'views/view-project.html',
                    controller: 'ViewProjectController',
                    access: {
                        requiresAuthentication: true,
                        requiresAdminOrLead: true
                    }
                })
                .when('/issues/:id', {
                    templateUrl: 'views/view-issue.html',
                    controller: 'ViewIssueController',
                    access: {
                        requiresAuthentication: true
                    }
                })
                .when('/issues/:id/edit', {
                    templateUrl: 'views/edit-issue.html',
                    controller: 'EditIssueController',
                    access: {
                        requiresAuthentication: true,
                        requiresAdminOrLead: true
                    }
                })
                .when('/profile/password', {
                    templateUrl: 'views/change-password.html',
                    controller: 'AuthenticationController',
                    access: {
                        requiresAuthentication: true
                    }
                })
                .when('/logout', {
                    controller: 'AuthenticationController',
                    redirectTo: '/',
                    access: {
                        requiresAuthentication: false
                    }
                })
                .when('/unauthorized', {
                    templateUrl: 'views/unauthorized.html',
                    controller: 'AuthenticationController',
                    access: {
                        requiresAuthentication: true
                    }
                })
                .otherwise({redirectTo: '/'});

            $httpProvider.interceptors.push('httpInterceptorService');
        }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('GRANT_TYPE', 'password')
    .run(function ($rootScope, $location, authService, projectsService, $route, notificationService) {
        var previousRoute;

        $rootScope.$on('$locationChangeStart', function (evt, absNewUrl, absOldUrl) {
            var hashIndex = absOldUrl.indexOf('#');
            previousRoute = absOldUrl.substring(hashIndex + 1);
        });

        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.access && next.access.requiresAuthentication && !authService.isAuthenticated()) {
                $location.path('/');
            } else if (next.access && next.access.requiresAdminOrLead && !authService.isAdmin()
                && !$rootScope.isUserProjectLead) {
                $location.path('/');
                notificationService.showError('You don\'t have access to this action!');
            }
        });
    });
