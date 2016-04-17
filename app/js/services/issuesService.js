'use strict';
issueTracker.factory('issuesService', [
    '$http',
    '$q',
    'BASE_URL',
    function ($http, $q, BASE_URL) {

        function getIssueById(issueId) {
            var deffered = $q.defer();

            $http.get(BASE_URL + 'Issues/' + issueId)
                .then(function (result) {
                    deffered.resolve(result);
                }, function (error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        function getIssuesForProject(projectId) {
            var deffered = $q.defer();

            $http.get(BASE_URL + 'Projects/' + projectId + '/Issues')
                .then(function (result) {
                    deffered.resolve(result);
                }, function (error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        function getCurrentUserIssues(params) {
            var deffered = $q.defer();

            var config = {
                params: params
            };

            $http.get(BASE_URL + 'Issues/me', config)
                .then(function (result) {
                    deffered.resolve(result);
                }, function (error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        function addIssueToProject(issue) {
            var deffered = $q.defer();

            $http.post(BASE_URL + 'Issues', issue)
                .then(function (result) {
                    deffered.resolve(result);
                }, function (error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        function changeIssueStatus(issueId, params) {
            var deffered = $q.defer();

            var config = {
                params: params
            };

            $http.put(BASE_URL + 'Issues/' + issueId + '/changestatus', null, config)
                .then(function (result) {
                    deffered.resolve(result);
                }, function (error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        return {
            getIssueById: getIssueById,
            getIssuesForProject: getIssuesForProject,
            getCurrentUserIssues: getCurrentUserIssues,
            addIssueToProject: addIssueToProject,
            changeIssueStatus: changeIssueStatus
        };
    }
]);