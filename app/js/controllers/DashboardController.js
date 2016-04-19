'use strict';

angular.module('issueTracker')
    .controller('DashboardController', [
        '$scope',
        'projectsService',
        'issuesService',
        function DashboardController($scope, projectsService, issuesService) {
            projectsService.getAffiliatedProjects()
                .then(function(projects) {
                    $scope.affiliatedProjects = projects;
                }, function(error) {
                    notificationService.showError('Error getting affiliated projects!', error);
                });

            var params = {
                pageNumber: 1,
                pageSize: 5,
                orderBy: 'DueDate desc'
            };

            $scope.paginationParams = params;

            $scope.getCurrentUserIssues = function() {
                issuesService.getCurrentUserIssues(params)
                    .then(function(response) {
                        $scope.issues = response.data.Issues;
                        $scope.totalUserIssuesCount = response.data.TotalPages * $scope.paginationParams.pageSize;
                    }, function(error) {
                        notificationService.showError('Error getting your issues!', error);
                    });
            };

            $scope.getCurrentUserIssues();

            $scope.pageChanged = function(newPage) {
                params.pageNumber = newPage;
                $scope.getCurrentUserIssues();
            };
        }
    ]);