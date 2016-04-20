'use strict';

angular.module('issueTracker')
    .directive('addLabelsForm', [
        'DEFAULT_MODEL_OPTIONS',
        function (DEFAULT_MODEL_OPTIONS) {
            return {
                restrict: 'A',
                templateUrl: 'views/common/add-labels.html',
                replace: true,
                controller: [
                    '$scope',
                    '$attrs',
                    'labelsService',
                    function ($scope, $attrs, labelsService) {
                        $scope.$watch($attrs.labels, function (newValue) {
                            $scope.labels = newValue;
                        });

                        $scope.modelOptions = DEFAULT_MODEL_OPTIONS;

                        var params = {
                            filter: $scope.labelToAdd ? $scope.labelToAdd : ''
                        };

                        $scope.getLabels = function () {
                            labelsService.getLabels(params)
                                .then(function (response) {
                                    $scope.availableLabels = response.data;
                                });
                        };

                        $scope.addLabel = function (label) {
                            $scope.labels.push(label);
                            $scope.labelToAdd = '';
                        };

                        $scope.removeLabel = function (label) {
                            var indexOfTheLabel = $scope.labels.indexOf(label);
                            $scope.labels.splice(indexOfTheLabel, 1);
                        };
                    }
                ]
            }
        }]);