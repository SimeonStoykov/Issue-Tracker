issueTracker.controller('DashboardController', [
    '$scope',
    'projectsService',
    'issuesService',
    function DashboardController($scope, projectsService, issuesService) {

        projectsService.getAffiliatedProjects()
            .then(function (projects) {
                $scope.affiliatedProjects = projects;
                console.log(projects);
            }, function (error) {
                console.log(error);
            });

        var params = {
            pageNumber: 1,
            pageSize: 5,
            orderBy: 'DueDate'
        };

        $scope.paginationParams = params;

        issuesService.getCurrentUserIssues(params)
            .then(function(){

            });

    }
]);