'use strict';

angular.module('issueTracker')
    .controller('ViewAllProjectsController', [
        '$scope',
        'projectsService',
        '$uibModal',
        'INITIAL_PAGE_NUMBER',
        'PROJECTS_PAGE_SIZE',
        'DEFAULT_PROJECTS_FILTER',
        function ViewAllProjectsController($scope, projectsService, $uibModal, INITIAL_PAGE_NUMBER, PROJECTS_PAGE_SIZE, DEFAULT_PROJECTS_FILTER) {
            $scope.projectsParams = {
                pageNumber: INITIAL_PAGE_NUMBER,
                pageSize: PROJECTS_PAGE_SIZE,
                filter: DEFAULT_PROJECTS_FILTER
            };

            $scope.getAllProjects = function () {
                projectsService.getAllProjects($scope.projectsParams)
                    .then(function (response) {
                        $scope.projects = response.data.Projects;
                        $scope.totalProjectsCount = response.data.TotalCount;
                    }, function (error) {
                        notificationService.showError('Error getting projects!', error);
                    });
            };

            $scope.getAllProjects();

            $scope.pageChanged = function (newPage) {
                $scope.projectsParams.pageNumber = newPage;
                $scope.getAllProjects();
            };

            $scope.openAddProjectModal = function () {
                $uibModal.open({
                    templateUrl: 'views/projects/add-project.html',
                    controller: 'AddProjectController',
                    backdrop: 'static',
                    keyboard: false
                });
            };
        }
    ]);