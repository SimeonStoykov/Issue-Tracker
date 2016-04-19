'use strict';

angular.module('issueTracker')
    .controller('AddProjectController', [
        '$scope',
        'projectsService',
        'usersService',
        'labelsService',
        'notificationService',
        '$location',
        '$uibModalInstance',
        function AddProjectController($scope, projectsService, usersService, labelsService,
                                      notificationService, $location, $uibModalInstance) {
            $scope.project = {
                labels: []
            };

            usersService.getAllUsers()
                .then(function(response) {
                    $scope.users = response.data;
                    $scope.project.selectedLead = $scope.users.filter(function(user) {
                        return user.Id === localStorage['currentUserId'];
                    })[0];
                });

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

            $scope.getLabels = function() {
                labelsService.getLabels(params)
                    .then(function(response) {
                        $scope.labels = response.data;
                    });
            };

            $scope.addLabel = function(label) {
                $scope.project.labels.push(label);
                $scope.labelToAdd = '';
            };

            $scope.removeLabel = function(label) {
                var indexOfTheLabel = $scope.project.labels.indexOf(label);
                $scope.project.labels.splice(indexOfTheLabel, 1);
            };

            $scope.addProject = function(project) {
                var labelsToAdd = project.labels.map(function(label) {
                    return {
                        Name: label
                    };
                });

                var prioritiesToAdd = project.priorities.split(',').map(function(priority) {
                    return {
                        Name: priority.trim()
                    }
                });

                var projectData = {
                    Name: project.name,
                    Description: project.description,
                    ProjectKey: project.key,
                    LeadId: project.selectedLead.Id,
                    Priorities: prioritiesToAdd,
                    Labels: labelsToAdd
                };

                projectsService.addNewProject(projectData)
                    .then(function(response) {
                        $uibModalInstance.close();
                        $location.path('/projects');
                        notificationService.showInfo('Project added successfully!');
                    }, function(error) {
                        notificationService.showError('Adding project failed!', error);
                    });
            };

            $scope.closeModal = function() {
                $uibModalInstance.dismiss();
                $location.path('/projects');
            };
        }
    ]);