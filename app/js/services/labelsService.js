'use strict';

angular.module('issueTracker')
    .factory('labelsService', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function getLabels(params) {
                var deffered = $q.defer();

                var config = {
                    params: params
                };

                $http.get(BASE_URL + 'Labels', config)
                    .then(function (result) {
                        deffered.resolve(result);
                    }, function (error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            return {
                getLabels: getLabels
            };
        }
    ]);