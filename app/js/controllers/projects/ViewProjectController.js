'use strict';

angular.module('issueTracker')
    .controller('ViewProjectController', [
        '$scope',
        '$route',
        '$uibModal',
        'projectsService',
        'issuesService',
        'authService',
        'INITIAL_PAGE_NUMBER',
        'DEFAULT_PAGE_SIZE',
        function ViewProjectController($scope, $route, $uibModal, projectsService, issuesService, authService,
                                       INITIAL_PAGE_NUMBER, DEFAULT_PAGE_SIZE) {
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
                        }, function (error) {
                            notificationService.showError('Getting project issues failed!', error);
                        });
                }, function (error) {
                    notificationService.showError('Getting project info failed!', error);
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
        }
    ]);