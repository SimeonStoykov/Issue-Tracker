issueTracker.controller('AuthenticationController', [
    '$scope',
    'authService',
    'GRANT_TYPE',
    '$route',
    function AuthenticationController($scope, authService, GRANT_TYPE, $route) {

        $scope.login = function (user) {
            user.grant_type = GRANT_TYPE;
            authService.loginUser(user)
                .then(function (response) {
                    localStorage['accessToken'] = response.data.access_token;
                    localStorage['username'] = response.data.userName;
                    authService.getCurrentUserInfo()
                        .then(function(userInfo) {
                            localStorage['currentUserId'] = userInfo.data.Id;
                            localStorage['isAdmin'] = userInfo.data.isAdmin;
                            $route.reload();
                        })
                });
        };

        $scope.register = function (user) {
            authService.registerUser(user)
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
            authService.logoutUser();
        };

        $scope.isAuthenticated = authService.isAuthenticated();
    }
]);