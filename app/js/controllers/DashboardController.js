'use strict';

angular.module('issueTracker')
    .controller('DashboardController', [
        '$scope',
        'projectsService',
        'issuesService',
        'INITIAL_PAGE_NUMBER',
        'DEFAULT_PAGE_SIZE',
        function DashboardController($scope, projectsService, issuesService, INITIAL_PAGE_NUMBER, DEFAULT_PAGE_SIZE) {
            projectsService.getAffiliatedProjects()
                .then(function(projects) {
                    $scope.affiliatedProjects = projects;
                }, function(error) {
                    notificationService.showError('Error getting affiliated projects!', error);
                });

            $scope.paginationParams = {
                pageNumber: INITIAL_PAGE_NUMBER,
                pageSize: DEFAULT_PAGE_SIZE,
                orderBy: 'DueDate desc'
            };

            $scope.getCurrentUserIssues = function() {
                issuesService.getCurrentUserIssues($scope.paginationParams)
                    .then(function(response) {
                        $scope.issues = response.data.Issues;
                        $scope.totalUserIssuesCount = response.data.TotalPages * $scope.paginationParams.pageSize;
                    }, function(error) {
                        notificationService.showError('Error getting your issues!', error);
                    });
            };

            $scope.getCurrentUserIssues();

            $scope.pageChanged = function(newPage) {
                $scope.paginationParams.pageNumber = newPage;
                $scope.getCurrentUserIssues();
            };
        }
    ]);