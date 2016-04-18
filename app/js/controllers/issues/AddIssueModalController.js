'use strict';

angular.module('issueTracker')
    .controller('AddIssueModalController', [
        '$scope',
        'projectsService',
        'usersService',
        'labelsService',
        'issuesService',
        'notificationService',
        '$routeParams',
        '$location',
        '$uibModalInstance',
        function AddIssueModalController($scope, projectsService, usersService, labelsService, issuesService,
                                         notificationService, $routeParams, $location, $uibModalInstance) {
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
                });

            $scope.getPrioritiesForProject = function (project) {
                $scope.priorities = project.Priorities;
                $scope.issue.priority = $scope.priorities[0];
            };

            $scope.modelOptions = {
                debounce: {
                    default: 100,
                    blur: 100
                },
                getterSetter: true
            };

            var params = {
                filter: $scope.labelToAdd ? $scope.labelToAdd : ''
            };

            $scope.getLabels = function () {
                labelsService.getLabels(params)
                    .then(function (response) {
                        $scope.labels = response.data;
                    });
            };

            $scope.addLabel = function (label) {
                $scope.issue.labels.push(label);
                $scope.labelToAdd = '';
            };

            $scope.removeLabel = function (label) {
                var indexOfTheLabel = $scope.issue.labels.indexOf(label);
                $scope.issue.labels.splice(indexOfTheLabel, 1);
            };

            $scope.addIssue = function (issue) {
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

                console.log(issue.dueDate.toUTCString());

                issuesService.addIssueToProject(issueData)
                    .then(function (response) {
                        $uibModalInstance.close();
                        $location.path('/projects/' + issue.selectedProject.Id);
                        notificationService.showInfo('Issue added successfully!');
                    }, function (error) {
                        notificationService.showError('Adding issue failed!', error);
                    });
            };

            $scope.format = 'dd-MM-yyyy';

            $scope.datePickerOptions = {
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            $scope.openCalendar = function () {
                $scope.calendar.isOpened = true;
            };

            $scope.calendar = {
                isOpened: false
            };

            $scope.dateOptions = {
                timezone: 'UTC+00:00'
            };

            $scope.closeModal = function () {
                $uibModalInstance.dismiss();
                $location.path('/projects/' + $routeParams.id);
            };
        }
    ]);