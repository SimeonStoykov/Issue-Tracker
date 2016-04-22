'use strict';

angular.module('issueTracker')
    .directive('editIssueForm', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'views/issues/edit-issue-form.html',
                replace: true
            }
        }
    ]);