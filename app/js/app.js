'use strict';

angular.module('issueTracker', [
        'ngRoute',
        'angular-loading-bar',
        'angularUtils.directives.dirPagination',
        'ui.bootstrap',
        '720kb.datepicker'
    ])
    .config([
        '$routeProvider',
        '$httpProvider',
        function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home/home-dashboard.html',
                    controller: 'AuthenticationController',
                    access: {
                        requiresAuthentication: false
                    }
                })
                .when('/projects', {
                    templateUrl: 'views/projects/view-all-projects.html',
                    controller: 'ViewAllProjectsController',
                    access: {
                        requiresAuthentication: true,
                        requiresAdmin: true
                    }
                })
                .when('/projects/add', {
                    templateUrl: 'views/projects/view-all-projects.html',
                    controller: 'ViewAllProjectsController',
                    access: {
                        requiresAuthentication: true,
                        requiresAdmin: true
                    }
                })
                .when('/projects/:id', {
                    templateUrl: 'views/projects/view-project.html',
                    controller: 'ViewProjectController',
                    access: {
                        requiresAuthentication: true
                    }
                })
                .when('/projects/:id/edit', {
                    templateUrl: 'views/projects/edit-project.html',
                    controller: 'EditProjectController',
                    access: {
                        requiresAuthentication: true
                    }
                })
                .when('/projects/:id/add-issue', {
                    templateUrl: 'views/projects/view-project.html',
                    controller: 'ViewProjectController',
                    access: {
                        requiresAuthentication: true
                    }
                })
                .when('/issues/:id', {
                    templateUrl: 'views/issues/view-issue.html',
                    controller: 'ViewIssueController',
                    access: {
                        requiresAuthentication: true
                    }
                })
                .when('/issues/:id/edit', {
                    templateUrl: 'views/issues/edit-issue.html',
                    controller: 'EditIssueController',
                    access: {
                        requiresAuthentication: true
                    }
                })
                .when('/profile/password', {
                    templateUrl: 'views/common/change-password.html',
                    controller: 'AuthenticationController',
                    access: {
                        requiresAuthentication: true
                    }
                })
                .when('/make-admin', {
                    templateUrl: 'views/make-admin.html',
                    controller: 'AdminController',
                    access: {
                        requiresAuthentication: true,
                        requiresAdmin: true
                    }
                })
                .when('/logout', {
                    controller: 'AuthenticationController',
                    redirectTo: '/',
                    access: {
                        requiresAuthentication: false
                    }
                })
                .otherwise({redirectTo: '/'});

            $httpProvider.interceptors.push('httpInterceptorService');
        }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('GRANT_TYPE', 'password')
    .constant('INITIAL_PAGE_NUMBER', 1)
    .constant('DEFAULT_PAGE_SIZE', 5)
    .constant('ALL_PROJECTS_PAGE_SIZE', 15)
    .constant('DEFAULT_PROJECTS_FILTER', '')
    .constant('DEFAULT_MODEL_OPTIONS', {
        debounce: {
            default: 100,
            blur: 100
        },
        getterSetter: true
    })
    .constant('DEFAULT_DATE_FORMAT', 'dd-MM-yyyy')
    .constant('DATE_PICKER_TIMEZONE', 'UTC+00:00')
    .constant('DEFAULT_DATE_PICKER_OPTIONS', {
        maxDate: new Date(2020, 5, 22),
        startingDay: 1
    })
    .constant('MAX_ITEMS_COUNT', 2147483647)
    .run([
        '$rootScope',
        '$location',
        'authService',
        'projectsService',
        '$route',
        'notificationService',
        function ($rootScope, $location, authService, projectsService, $route, notificationService) {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if (next.access && next.access.requiresAuthentication && !authService.isAuthenticated()) {
                    $location.path('/');
                } else if (next.access && next.access.requiresAdmin && !authService.isAdmin()) {
                    $location.path('/');
                    notificationService.showError('You don\'t have access to this action!');
                }
            });
        }]);
