'use strict';

angular.module('issueTracker')
    .controller('ViewAllProjectsController', [
        '$scope',
        'projectsService',
        function ViewAllProjectsController($scope, projectsService) {

            $scope.projectsParams = {
                pageNumber: 1,
                pageSize: 15,
                filter: ''
            };

            projectsService.getAllProjects($scope.projectsParams)
                .then(function (response) {
                    $scope.projects = response.data.Projects;
                    $scope.totalProjectsCount = response.data.TotalCount;
                }, function (error) {
                    notificationService.showError('Error getting projects!', error);
                });

            $scope.pageChanged = function (newPage) {
                $scope.projectsParams.pageNumber = newPage;
                projectsService.getAllProjects($scope.projectsParams)
                    .then(function (response) {
                        $scope.projects = response.data.Projects;
                        $scope.totalProjectsCount = response.data.TotalCount;
                    }, function (error) {
                        notificationService.showError('Error getting projects!', error);
                    });
            };
        }
    ]);