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
            orderBy: 'DueDate desc'
        };

        $scope.paginationParams = params;

        issuesService.getCurrentUserIssues(params)
            .then(function (response) {
                $scope.issues = response.data.Issues;
                $scope.totalUserIssuesCount = response.data.TotalPages * $scope.paginationParams.pageSize;
            });

        $scope.pageChanged = function (newPage) {
            params.pageNumber = newPage;
            issuesService.getCurrentUserIssues(params)
                .then(function (response) {
                    $scope.issues = response.data.Issues;
                    $scope.totalUserIssuesCount = response.data.TotalPages * $scope.paginationParams.pageSize;
                });
        };
    }
]);