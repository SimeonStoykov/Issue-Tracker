'use strict';

angular.module('issueTracker')
    .controller('AddIssueController', [
        '$scope',
        '$routeParams',
        '$location',
        '$uibModalInstance',
        'projectsService',
        'usersService',
        'issuesService',
        'notificationService',
        function AddIssueController($scope, $routeParams, $location, $uibModalInstance, projectsService, usersService,
                                    issuesService, notificationService) {
            $scope.openedProjectId = $routeParams.id;
            $scope.issue = {
                labels: []
            };

            projectsService.getAllProjects()
                .then(function (response) {
                    $scope.projects = response.data;

                    $scope.issue.selectedProject = $scope.projects.filter(function (project) {
                        return project.Id.toString() === $scope.openedProjectId;
                    })[0];

                    $scope.priorities = $scope.issue.selectedProject.Priorities;

                    $scope.issue.priority = $scope.priorities[0];

                    usersService.getAllUsers()
                        .then(function (response) {
                            $scope.users = response.data;

                            $scope.issue.assignee = $scope.users.filter(function (user) {
                                return user.Id === $scope.issue.selectedProject.Lead.Id;
                            })[0];
                        });
                }, function (error) {
                    notificationService.showError('Failed to get all projects!', error);
                });

            $scope.getPrioritiesForProject = function (project) {
                $scope.priorities = project.Priorities;
                $scope.issue.priority = $scope.priorities[0];
            };

            $scope.addIssue = function (issue) {
                if (issue.title && issue.description && issue.dueDate && issue.priority) {
                    var labelsToAdd = issue.labels.map(function (label) {
                        return {
                            Name: label
                        };
                    });

                    var issueData = {
                        Title: issue.title,
                        Description: issue.description,
                        DueDate: issue.dueDate,
                        ProjectId: issue.selectedProject.Id,
                        AssigneeId: issue.assignee.Id,
                        PriorityId: issue.priority.Id,
                        Labels: labelsToAdd
                    };

                    issuesService.addIssueToProject(issueData)
                        .then(function () {
                            $uibModalInstance.close();
                            $location.path('/projects/' + issue.selectedProject.Id);
                            notificationService.showInfo('Issue added successfully!');
                        }, function (error) {
                            notificationService.showError('Adding issue failed!', error);
                        });
                }
            };

            $scope.closeModal = function () {
                $uibModalInstance.dismiss();
                $location.path('/projects/' + $routeParams.id);
            };
        }
    ]);