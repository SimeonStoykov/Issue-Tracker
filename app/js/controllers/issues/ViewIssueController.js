'use strict';

angular.module('issueTracker')
    .controller('ViewIssueController', [
        '$scope',
        '$rootScope',
        'issuesService',
        'authService',
        'projectsService',
        '$route',
        'notificationService',
        function ViewIssueController($scope, $rootScope, issuesService, authService, projectsService, $route, notificationService) {

            issuesService.getIssueById($route.current.params.id)
                .then(function (response) {
                    $scope.issue = response.data;
                    $scope.isUserIssueAssignee = $scope.issue.Assignee.Id === localStorage['currentUserId'];

                    projectsService.getProjectById($scope.issue.Project.Id)
                        .then(function (response) {
                            $scope.project = response.data;
                            $scope.isUserProjectLead = $scope.project.Lead.Id === localStorage['currentUserId'];
                            $rootScope.isUserProjectLead = $scope.isUserProjectLead;
                        });
                });

            issuesService.getIssueComments($route.current.params.id)
                .then(function (response) {
                    console.log(response);
                    $scope.comments = response.data;
                });

            $scope.isAdmin = authService.isAdmin();

            $scope.changeIssueStatus = function (statusId) {
                var params = {
                    statusid: statusId
                };

                issuesService.changeIssueStatus($route.current.params.id, params)
                    .then(function (response) {
                        $route.reload();
                        notificationService.showInfo('Issue status changed successfully!');
                    }, function (error) {
                        notificationService.showError('Issue status changing failed!', error);
                    });
            }
        }
    ]);