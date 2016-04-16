issueTracker.controller('ViewIssueController', [
    '$scope',
    '$route',
    'issuesService',
    function ViewIssueController($scope, $route, issuesService) {

        issuesService.getIssueById($route.current.params.id)
            .then(function (response) {
                console.log(response);
            });

    }
]);