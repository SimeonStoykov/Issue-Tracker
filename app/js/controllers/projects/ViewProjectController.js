'use strict';

angular.module('issueTracker')
    .controller('ViewProjectController', [
        '$scope',
        'projectsService',
        'issuesService',
        '$route',
        'authService',
        '$uibModal',
        'INITIAL_PAGE_NUMBER',
        'DEFAULT_PAGE_SIZE',
        function ViewProjectController($scope, projectsService, issuesService, $route, authService, $uibModal, INITIAL_PAGE_NUMBER, DEFAULT_PAGE_SIZE) {
            projectsService.getProjectById($route.current.params.id)
                .then(function (response) {
                    $scope.project = response.data;
                    $scope.isUserProjectLead = $scope.project.Lead.Id === localStorage['currentUserId'];

                    $scope.project.Priorities = $scope.project.Priorities.map(function (priority) {
                        return priority.Name;
                    });

                    $scope.project.projectPriorities = $scope.project.Priorities.join(', ');

                    issuesService.getIssuesForProject($route.current.params.id)
                        .then(function (response) {
                            $scope.issues = response.data;
                            $scope.issues.map(function (issue) {
                                var dateParts = issue.DueDate.substring(0, 10).split('-');
                                issue.DueDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
                            });
                        });
                });

            $scope.paginationParams = {
                pageNumber: INITIAL_PAGE_NUMBER,
                pageSize: DEFAULT_PAGE_SIZE
            };

            $scope.isAdmin = authService.isAdmin();

            $scope.openAddIssueModal = function () {
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

            $scope.showAllIssues = function () {
                $scope.search = {};
                $scope.allIssuesShown = true;
            };

            $scope.showMyIssues = function () {
                $scope.search = {
                    Assignee: {
                        Username: localStorage['username']
                    }
                };
                $scope.allIssuesShown = false;
            };

            $scope.allIssuesShown = false;
        }
    ]);