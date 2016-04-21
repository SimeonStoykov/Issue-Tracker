'use strict';

angular.module('issueTracker')
    .controller('EditIssueController', [
        '$scope',
        '$route',
        '$location',
        'authService',
        'issuesService',
        'projectsService',
        'usersService',
        'notificationService',
        function EditIssueController($scope, $route, $location, authService, issuesService, projectsService, usersService, notificationService) {
            issuesService.getIssueById($route.current.params.id)
                .then(function (response) {
                    $scope.issue = response.data;

                    $scope.issue.labels = $scope.issue.Labels.map(function (label) {
                        return label.Name;
                    });

                    $scope.issue.DueDate = new Date($scope.issue.DueDate);

                    projectsService.getProjectById($scope.issue.Project.Id)
                        .then(function (response) {
                            $scope.project = response.data;

                            $scope.isUserProjectLead = $scope.project.Lead.Id === localStorage['currentUserId'];

                            if (!$scope.isUserProjectLead && !$scope.isAdmin) {
                                $location.path('issues/' + $route.current.params.id);
                                notificationService.showError('You don\'t have rights to perform this action!');
                            }

                            $scope.priorities = $scope.project.Priorities;

                            $scope.issue.priority = $scope.priorities.filter(function (priority) {
                                return priority.Id === $scope.issue.Priority.Id;
                            })[0];

                            usersService.getAllUsers()
                                .then(function (response) {
                                    $scope.users = response.data;

                                    $scope.issue.assignee = $scope.users.filter(function (user) {
                                        return user.Id === $scope.issue.Assignee.Id;
                                    })[0];
                                });
                        });
                });

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
            };

            $scope.editIssue = function (issue) {
                var labelsToAdd = issue.labels.map(function (label) {
                    return {
                        Name: label
                    }
                });

                var issueData = {
                    Title: issue.Title,
                    Description: issue.Description,
                    DueDate: issue.DueDate,
                    AssigneeId: issue.assignee.Id,
                    PriorityId: issue.priority.Id,
                    Labels: labelsToAdd
                };

                issuesService.editIssue($route.current.params.id, issueData)
                    .then(function () {
                        $location.path('/issues/' + $route.current.params.id);
                        notificationService.showInfo('Issue edited successfully!');
                    }, function (error) {
                        notificationService.showError('Issue editing failed!', error);
                    });
            };

            $scope.isAdmin = authService.isAdmin();
        }
    ]);