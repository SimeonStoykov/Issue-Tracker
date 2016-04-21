'use strict';

angular.module('issueTracker')
    .directive('issueComments', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'views/issues/issue-comments.html',
                controller: [
                    '$scope',
                    'DEFAULT_PAGE_SIZE',
                    function ($scope, DEFAULT_PAGE_SIZE) {
                        $scope.commentsPaginationParams = {
                            pageSize: DEFAULT_PAGE_SIZE
                        }
                    }
                ]
            }
        }]);