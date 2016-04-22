'use strict';

angular.module('issueTracker')
    .directive('editProjectForm', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'views/projects/edit-project-form.html',
                replace: true
            }
        }
    ]);