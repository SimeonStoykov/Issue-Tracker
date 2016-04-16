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
                    controller: 'ProjectsController',
                    access: {
                        requiresAuthentication: true
                    }
                })
                .when('/projects/:id/edit', {
                    templateUrl: 'views/edit-project.html',
                    controller: 'ProjectsController',
                    access: {
                        requiresAuthentication: true,
                        requiresAdminOrLead: true
                    }
                })
                .when('/projects/:id/add-issue', {
                    templateUrl: 'views/view-project.html',
                    controller: 'ProjectsController',
                    access: {
                        requiresAuthentication: true,
                        requiresAdminOrLead: true
                    }
                })
                .when('/issues/:id', {
                    templateUrl: 'views/issue.html',
                    controller: 'IssuesController'
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
                .otherwise({redirectTo: '/'});

            $httpProvider.interceptors.push('httpInterceptorService');
        }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('GRANT_TYPE', 'password')
    .run(function ($rootScope, $location, authService, projectsService, $route, notificationService) {
        var previousRoute;

        $rootScope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
            var hashIndex = absOldUrl.indexOf('#');
            previousRoute = absOldUrl.substring(hashIndex + 1);
        });

        $rootScope.$on('$routeChangeStart', function (event, next) {

            if (next.access && next.access.requiresAuthentication && !authService.isAuthenticated()) {
                $location.path('/');
            } else if (next.access && next.access.requiresAdminOrLead && !authService.isAdmin()) {
                projectsService.isUserProjectLead()
                    .then(function (isUserProjectLead) {
                        if (!isUserProjectLead) {
                            $location.path('/projects/' + $route.current.params.id);
                            notificationService.showError('You must be admin or project lead to perform this action!');
                        }
                    }, function (error) {
                        $location.path('/projects/' + $route.current.params.id);
                        notificationService.showError('You can not access this resource that way!');
                    });
            }

        });
    });

