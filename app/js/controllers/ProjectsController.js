issueTracker.controller('ProjectsController', [
    '$scope',
    'projectsService',
    'issuesService',
    '$routeParams',
    'authService',
    function ProjectsController($scope, projectsService, issuesService, $routeParams, authService) {
        projectsService.getProjectById($routeParams.id)
            .then(function (response) {
                $scope.project = response.data;

                $scope.isUserProjectLead = $scope.project.Lead.Id === localStorage['currentUserId'];

                $scope.project.Labels = $scope.project.Labels.map(function(label){
                    return label.Name;
                });
                $scope.projectLabels = $scope.project.Labels.join(', ');

                $scope.project.Priorities = $scope.project.Priorities.map(function(priority){
                    return priority.Name;
                });

                $scope.projectPriorities = $scope.project.Priorities.join(', ');
            });

        $scope.paginationParams = {
            pageNumber: 1,
            pageSize: 5
        };

        $scope.pageChanged = function (newPage) {
            var endIndex = newPage * $scope.paginationParams.pageSize;
            var startIndex = endIndex - $scope.paginationParams.pageSize;

            $scope.shownIssues = $scope.issues.slice(startIndex, endIndex);
        };

        issuesService.getIssuesForProject($routeParams.id)
            .then(function(response){
                $scope.issues = response.data;
                var endIndex = $scope.paginationParams.pageNumber * $scope.paginationParams.pageSize;
                var startIndex = 0;

                $scope.shownIssues = $scope.issues.slice(startIndex, endIndex);
            });

        $scope.isAdmin = authService.isAdmin();

    }
]);