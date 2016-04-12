issueTracker.controller('HomeController', [
    '$scope',
    'authentication',
    'GRANT_TYPE',
    '$cookies',
    '$route',
    '$location',
    function HomeController($scope, authentication, GRANT_TYPE, $cookies, $route, $location) {
        $scope.login = function (user) {
            user.grant_type = GRANT_TYPE;
            authentication.loginUser(user)
                .then(function (response) {
                    authentication.setAuthData(response.data);
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
            authentication.logoutUser();
        };
        $scope.isAuthenticated = authentication.isAuthenticated();
    }
]);