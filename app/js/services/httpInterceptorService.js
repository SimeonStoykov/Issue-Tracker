'use strict';

angular.module('issueTracker')
    .factory('httpInterceptorService', [
        '$q',
        '$injector',
        function($q, $injector) {
            return {
                'request': function(config) {
                    var authService = $injector.get('authService');
                    if (authService.isAuthenticated()) {
                        config.headers['Authorization'] = 'Bearer ' + localStorage['accessToken'];
                    }

                    return config;
                },

                'requestError': function(rejection) {
                    //do something with the error
                    return $q.reject(rejection);
                },

                'response': function(response) {
                    // do something on success of request
                    return response;
                },

                'responseError': function(rejection) {
                    // do something on error like:
                    //if(response.status == 401){
                    //     userUnauthorized();
                    //}
                    return $q.reject(rejection);
                }
            };
        }
    ]);