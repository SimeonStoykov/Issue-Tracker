'use strict';

angular.module('issueTracker')
    .directive('datePicker', [
        'DEFAULT_DATE_FORMAT',
        'DATE_PICKER_TIMEZONE',
        'DEFAULT_DATE_PICKER_OPTIONS',
        function(DEFAULT_DATE_FORMAT, DATE_PICKER_TIMEZONE, DEFAULT_DATE_PICKER_OPTIONS) {
            return {
                require: 'ngModel',
                restrict: 'A',
                templateUrl: 'views/common/date-picker.html',
                replace: true,
                scope: {
                    date: '='
                },
                controller: ['$scope', function($scope) {
                    $scope.format = DEFAULT_DATE_FORMAT;

                    $scope.datePickerOptions = DEFAULT_DATE_PICKER_OPTIONS;

                    $scope.openCalendar = function() {
                        $scope.calendar.isOpened = true;
                    };

                    $scope.calendar = {
                        isOpened: false
                    };

                    $scope.dateOptions = {
                        timezone: DATE_PICKER_TIMEZONE
                    };
                }]
            }
        }]);