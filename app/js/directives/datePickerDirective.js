'use strict';

angular.module('issueTracker')
    .directive('datePicker', [function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            templateUrl: 'views/common/date-picker.html',
            replace: true,
            scope: {
                date: '='
            },
            controller: ['$scope', function($scope) {
                $scope.format = 'dd-MM-yyyy';

                $scope.datePickerOptions = {
                    maxDate: new Date(2020, 5, 22),
                    startingDay: 1
                };

                $scope.openCalendar = function() {
                    $scope.calendar.isOpened = true;
                };

                $scope.calendar = {
                    isOpened: false
                };

                $scope.dateOptions = {
                    timezone: 'UTC+00:00'
                };
            }]
        }
    }]);