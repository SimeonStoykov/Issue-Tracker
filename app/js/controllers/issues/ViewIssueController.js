'use strict';

angular.module('issueTracker')
    .controller('ViewIssueController', [
        '$scope',
        'issuesService',
        'authService',
        'projectsService',
        '$route',
        'notificationService',
        '$location',
        '$rootScope',
        function ViewIssueController($scope, issuesService, authService, projectsService, $route, notificationService) {
            issuesService.getIssueById($route.current.params.id)
                .then(function(response) {
                    $scope.issue = response.data;
                    $scope.isUserIssueAssignee = $scope.issue.Assignee.Id === localStorage['currentUserId'];

                    projectsService.getProjectById($scope.issue.Project.Id)
                        .then(function(response) {
                            $scope.project = response.data;
                            $scope.isUserProjectLead = $scope.project.Lead.Id === localStorage['currentUserId'];

                            issuesService.getIssuesForProject($scope.issue.Project.Id)
                                .then(function(response) {
                                    $scope.projectIssues = response.data;
                                    $scope.userHaveIssueInTheProject = false;
                                    for (var i = 0; i < $scope.projectIssues.length; i++) {
                                        if ($scope.projectIssues[i].Assignee.Id === localStorage['currentUserId']) {
                                            $scope.userHaveIssueInTheProject = true;
                                            break;
                                        }
                                    }
                                });

                        });
                });

            issuesService.getIssueComments($route.current.params.id)
                .then(function(response) {
                    $scope.comments = response.data;
                });

            $scope.isAdmin = authService.isAdmin();

            $scope.changeIssueStatus = function (statusId) {
                var params = {
                    statusid: statusId
                };

                issuesService.changeIssueStatus($route.current.params.id, params)
                    .then(function(response) {
                        $route.reload();
                        notificationService.showInfo('Issue status changed successfully!');
                    }, function(error) {
                        notificationService.showError('Issue status changing failed!', error);
                    });
            };

            $scope.addComment = function(comment) {
                comment = {
                    Text: comment
                };
                issuesService.addCommentToIssue($route.current.params.id, comment)
                    .then(function(response) {
                        $route.reload();
                        notificationService.showInfo('Comment added successfully!');
                    }, function(error) {
                        notificationService.showError('Adding comment failed!', error);
                    });
            }
        }
    ]);