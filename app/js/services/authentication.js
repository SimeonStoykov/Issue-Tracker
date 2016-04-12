issueTracker.factory('authentication', [
    '$http',
    '$q',
    'BASE_URL',
    '$cookies',
    '$route',
    function ($http, $q, BASE_URL, $cookies, $route) {
        function registerUser(user) {
            var deffered = $q.defer();

            $http.post(BASE_URL + 'api/Account/Register', user)
                .then(function (result) {
                    deffered.resolve(result);
                }, function (error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        function loginUser(user) {
            var deffered = $q.defer();
            var config = {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (params) {
                    var encodedParams = [];
                    for (var key in params)
                        encodedParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
                    return encodedParams.join('&');
                }
            };
            $http.post(BASE_URL + 'api/Token', user, config)
                .then(function (result) {
                    deffered.resolve(result);
                }, function (error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        function logoutUser() {
            return $q.when($cookies.remove('access_token'));
        }

        return {
            registerUser: registerUser,
            loginUser: loginUser,
            logoutUser: logoutUser
        };
    }
]);