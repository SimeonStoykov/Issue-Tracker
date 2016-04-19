'use strict';

angular.module('issueTracker')
    .controller('ViewAllProjectsController', [
        '$scope',
        'projectsService',
        '$uibModal',
        function ViewAllProjectsController($scope, projectsService, $uibModal) {

            $scope.projectsParams = {
                pageNumber: 1,
                pageSize: 15,
                filter: ''
            };

            $scope.getAllProjects = function() {
                projectsService.getAllProjects($scope.projectsParams)
                    .then(function(response) {
                        $scope.projects = response.data.Projects;
                        $scope.totalProjectsCount = response.data.TotalCount;
                    }, function(error) {
                        notificationService.showError('Error getting projects!', error);
                    });
            };

            $scope.getAllProjects();

            $scope.pageChanged = function(newPage) {
                $scope.projectsParams.pageNumber = newPage;
                $scope.getAllProjects();
            };

            $scope.openAddProjectModal = function() {
                $uibModal.open({
                    templateUrl: 'views/projects/add-project.html',
                    controller: 'AddProjectController',
                    backdrop: 'static',
                    keyboard: false
                });
            };
        }
    ]);