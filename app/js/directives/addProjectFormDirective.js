'use strict';

angular.module('issueTracker')
    .directive('addProjectForm', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'views/projects/add-project-form.html',
                replace: true
            }
        }
    ]);