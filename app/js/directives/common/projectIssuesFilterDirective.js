'use strict';

angular.module('issueTracker')
    .directive('projectIssuesFilter', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'views/projects/project-issues-filter.html',
                controller: [
                    '$scope',
                    function ($scope) {
                        $scope.filterBy = 'myIssues';
                        $scope.search = {
                            Assignee: {
                                Username: localStorage['username']
                            }
                        };

                        $scope.changeFilter = function () {
                            $scope.search = {};
                            if ($scope.filterBy === 'myIssues') {
                                $scope.search = {
                                    Assignee: {
                                        Username: localStorage['username']
                                    }
                                }
                            }
                        };
                    }
                ]
            }
        }]);