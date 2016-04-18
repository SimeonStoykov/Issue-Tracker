'use strict';

angular.module('issueTracker')
    .directive('issueComments', [function() {
        return {
            restrict: 'A',
            templateUrl: 'views/issues/issue-comments.html'
        }
    }]);