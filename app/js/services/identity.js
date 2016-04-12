issueTracker.factory('identity', [
    '$cookies',
    function Identity($cookies){

        function isAuthenticated(){
            return $cookies.get('access_token');
        }

        return {
            isAuthenticated: isAuthenticated
        }
    }
]);