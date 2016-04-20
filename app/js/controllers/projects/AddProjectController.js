'use strict';

angular.module('issueTracker')
    .controller('AddProjectController', [
        '$scope',
        '$location',
        '$uibModalInstance',
        'projectsService',
        'usersService',
        'notificationService',
        function AddProjectController($scope, $location, $uibModalInstance, projectsService, usersService, notificationService) {
            $scope.project = {
                labels: []
            };

            usersService.getAllUsers()
                .then(function (response) {
                    $scope.users = response.data;
                    $scope.project.selectedLead = $scope.users.filter(function (user) {
                        return user.Id === localStorage['currentUserId'];
                    })[0];
                });

            $scope.addProject = function (project) {
                if (project.name && project.description && project.priorities) {
                    var labelsToAdd = project.labels.map(function (label) {
                        return {
                            Name: label
                        };
                    });

                    var prioritiesToAdd = project.priorities.split(',').map(function (priority) {
                        return {
                            Name: priority.trim()
                        }
                    });

                    var projectKeyWords = $scope.project.name.split(/\s+/);

                    projectKeyWords = projectKeyWords.map(function (word) {
                       return word[0];
                    });

                    var projectKey = projectKeyWords.join('');

                    var projectData = {
                        Name: project.name,
                        Description: project.description,
                        ProjectKey: projectKey,
                        LeadId: project.selectedLead.Id,
                        Priorities: prioritiesToAdd,
                        Labels: labelsToAdd
                    };

                    projectsService.addNewProject(projectData)
                        .then(function () {
                            $uibModalInstance.close();
                            $location.path('/projects');
                            notificationService.showInfo('Project added successfully!');
                        }, function (error) {
                            notificationService.showError('Adding project failed!', error);
                        });
                }
            };

            $scope.closeModal = function () {
                $uibModalInstance.dismiss();
                $location.path('/projects');
            };
        }
    ]);