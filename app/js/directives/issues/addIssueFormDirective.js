'use strict';

angular.module('issueTracker')
    .directive('addIssueForm', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'views/issues/add-issue-form.html',
                replace: true
            }
        }
    ]);