'use strict';

angular.module('issueTracker')
    .directive('loginForm', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'views/home/login.html'
            }
        }]);