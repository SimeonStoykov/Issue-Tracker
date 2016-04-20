'use strict';

angular.module('issueTracker')
    .controller('EditProjectController', [
        '$scope',
        '$routeParams',
        '$location',
        'projectsService',
        'usersService',
        'notificationService',
        'authService',
        function EditProjectController($scope, $routeParams, $location, projectsService, usersService, notificationService,
                                       authService) {
            projectsService.getProjectById($routeParams.id)
                .then(function (response) {
                    $scope.project = response.data;

                    $scope.isUserPojectLead = $scope.project.Lead.Id === localStorage['currentUserId'];

                    if (!$scope.isUserPojectLead && !$scope.isAdmin) {
                        $location.path('projects/' + $routeParams.id);
                        notificationService.showError('You don\'t have rights to perform this action!');
                    }

                    $scope.project.editedLabels = $scope.project.Labels.map(function (label) {
                        return label.Name;
                    });

                    $scope.project.Priorities = $scope.project.Priorities.map(function (priority) {
                        return priority.Name;
                    });

                    $scope.project.projectPriorities = $scope.project.Priorities.join(', ');

                    if ($scope.isAdmin) {
                        usersService.getAllUsers()
                            .then(function (response) {
                                $scope.users = response.data;
                                $scope.project.selectedUser = $scope.users.filter(function (user) {
                                    return user.Id === $scope.project.Lead.Id;
                                })[0];
                            }, function (error) {
                                notificationService.showError('Getting users data failed!', error);
                            });
                    }
                }, function (error) {
                    notificationService.showError('Getting project data failed!', error);
                });

            $scope.editProject = function (project) {
                var prioritiesToAdd = [];

                if (project.projectPriorities.length > 0) {
                    prioritiesToAdd = project.projectPriorities.split(',').map(function (priority) {
                        return {
                            Name: priority.trim()
                        };
                    });
                }

                var labelsToAdd = $scope.project.editedLabels.map(function (label) {
                    return {
                        Name: label
                    };
                });

                var projectToEdit = {
                    Name: project.Name,
                    Description: project.Description,
                    priorities: prioritiesToAdd,
                    labels: labelsToAdd,
                    LeadId: project.selectedUser.Id
                };

                projectsService.editProject($routeParams.id, projectToEdit)
                    .then(function () {
                        $location.path("projects/" + $routeParams.id);
                        notificationService.showInfo('Project edited successfully!');
                    }, function (error) {
                        notificationService.showError('Editing project failed!', error);
                    });
            };

            $scope.isAdmin = authService.isAdmin();
        }
    ]);