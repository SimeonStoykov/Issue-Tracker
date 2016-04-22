'use strict';

angular.module('issueTracker')
    .directive('registerForm', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'views/home/register.html'
            }
        }]);