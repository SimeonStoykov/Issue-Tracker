'use strict';

angular.module('issueTracker')
    .factory('usersService', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function getCurrentUserInfo() {
                var deffered = $q.defer();

                $http.get(BASE_URL + 'Users/me')
                    .then(function (result) {
                        deffered.resolve(result);
                    }, function (error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            function getAllUsers() {
                var deffered = $q.defer();

                $http.get(BASE_URL + 'Users')
                    .then(function (result) {
                        deffered.resolve(result);
                    }, function (error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            return {
                getCurrentUserInfo: getCurrentUserInfo,
                getAllUsers: getAllUsers
            };
        }
    ]);