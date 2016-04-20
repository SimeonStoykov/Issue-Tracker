'use strict';

angular.module('issueTracker')
    .directive('issueCommentForm', [
        function() {
            return {
                restrict: 'A',
                templateUrl: 'views/issues/issue-comment-form.html'
            }
        }]);