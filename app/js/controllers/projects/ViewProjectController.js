'use strict';

angular.module('issueTracker')
    .controller('ViewProjectController', [
        '$scope',
        '$rootScope',
        'projectsService',
        'issuesService',
        '$route',
        'authService',
        'usersService',
        '$uibModal',
        '$filter',
        function ViewProjectController($scope, $rootScope, projectsService, issuesService, $route, authService, usersService, $uibModal, $filter) {

            projectsService.getProjectById($route.current.params.id)
                .then(function(response) {
                    $scope.project = response.data;
                    $scope.isUserProjectLead = $scope.project.Lead.Id === localStorage['currentUserId'];
                    $rootScope.isUserProjectLead = $scope.isUserProjectLead;

                    $scope.project.Priorities = $scope.project.Priorities.map(function(priority) {
                        return priority.Name;
                    });

                    $scope.project.projectPriorities = $scope.project.Priorities.join(', ');

                    issuesService.getIssuesForProject($route.current.params.id)
                        .then(function(response) {
                            $scope.issues = response.data;
                            $scope.issues.forEach(function(issue) {
                                $filter('date')(issue, 'dd-MM-yyyy');
                            });
                        });

                    usersService.getAllUsers()
                        .then(function(response) {
                            $scope.users = response.data;
                            $scope.project.selectedUser = $scope.users.filter(function(user) {
                                return user.Id === $scope.project.Lead.Id;
                            })[0];
                        });
                });

            $scope.paginationParams = {
                pageNumber: 1,
                pageSize: 5
            };

            $scope.pageChanged = function(newPage) {
            };

            $scope.isAdmin = authService.isAdmin();

            $scope.openAddIssueModal = function() {
                $uibModal.open({
                    templateUrl: 'views/issues/add-issue.html',
                    controller: 'AddIssueController',
                    backdrop: 'static',
                    keyboard: false
                });
            };

            $scope.search = {
                Assignee: {
                    Username: localStorage['username']
                }
            };

            $scope.showAllIssues = function() {
                console.log($scope.search);
                $scope.search = {};
            };

            $scope.showMyIssues = function() {
                $scope.search = {
                    Assignee: {
                        Username: localStorage['username']
                    }
                }
            };
        }
    ]);