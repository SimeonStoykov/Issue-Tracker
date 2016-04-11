issueTracker.controller('HomeController', [
    '$scope',
    'authentication',
    'GRANT_TYPE',
    function HomeController($scope, authentication, GRANT_TYPE) {
        $scope.login = function (user) {
            user.grant_type = GRANT_TYPE;
            authentication.loginUser(user)
                .then(function (result) {
                    console.log(result);
                    console.log($scope);
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
                    authentication.loginUser(loginUserData);
                });
        };
    }
]);