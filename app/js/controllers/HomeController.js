issueTracker.controller('HomeController', [
    '$scope',
    'authentication',
    'GRANT_TYPE',
    '$cookies',
    'identity',
    '$route',
    function HomeController($scope, authentication, GRANT_TYPE, $cookies, identity, $route) {
        $scope.login = function (user) {
            user.grant_type = GRANT_TYPE;
            authentication.loginUser(user)
                .then(function (result) {
                    $cookies.put('access_token', result.data.access_token);
                    $route.reload();
                });
        };
        $scope.register = function (user) {
            authentication.registerUser(user)
                .then(function (result) {
                    var loginUserData = {
                        username: user.email,
                        password: user.password,
                        grant_type: GRANT_TYPE
                    };
                    $scope.login(loginUserData);
                });
        };
        $scope.logout = function () {
            authentication.logoutUser()
                .then(function (result) {
                    $route.reload();
                });
        };
        $scope.isAuthenticated = identity.isAuthenticated();
    }
]);