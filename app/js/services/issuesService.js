issueTracker.factory('issuesService', [
    '$http',
    '$q',
    'BASE_URL',
    function ($http, $q, BASE_URL) {

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

        //function getIssuesForProject(projectId) {
        //    var deffered = $q.defer();
        //
        //    $http.get(BASE_URL + 'Projects/' + projectId + '/Issues')
        //        .then(function (result) {
        //            deffered.resolve(result);
        //        }, function (error) {
        //            deffered.reject(error);
        //        });
        //
        //    return deffered.promise;
        //}
        //
        //function getProjectById(id) {
        //    var deffered = $q.defer();
        //
        //    $http.get(BASE_URL + 'Projects/' + id)
        //        .then(function (result) {
        //            deffered.resolve(result);
        //        }, function (error) {
        //            deffered.reject(error);
        //        });
        //
        //    return deffered.promise;
        //}

        return {
            getIssuesForProject: getIssuesForProject,
            getCurrentUserIssues: getCurrentUserIssues
        };
    }
]);