'use strict';

angular.module('issueTracker')
    .directive('projectIssuesFilter', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'views/projects/project-issues-filter.html',
                controller: [
                    '$scope',
                    'DEFAULT_PROJECT_ISSUES_FILTER',
                    function ($scope, DEFAULT_PROJECT_ISSUES_FILTER) {
                        $scope.filterBy = 'myIssues';
                        $scope.search = DEFAULT_PROJECT_ISSUES_FILTER;

                        $scope.changeFilter = function () {
                            $scope.search = {};
                            if ($scope.filterBy === 'myIssues') {
                                $scope.search = DEFAULT_PROJECT_ISSUES_FILTER;
                            }
                        }
                    }
                ]
            }
        }]);