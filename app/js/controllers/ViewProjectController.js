'use strict';
issueTracker.controller('ViewProjectController', [
    '$scope',
    '$rootScope',
    'projectsService',
    'issuesService',
    '$route',
    'authService',
    'usersService',
    '$uibModal',
    function ViewProjectController($scope, $rootScope, projectsService, issuesService, $route, authService, usersService, $uibModal) {

        projectsService.getProjectById($route.current.params.id)
            .then(function (response) {
                $scope.project = response.data;
                $scope.isUserProjectLead = $scope.project.Lead.Id === localStorage['currentUserId'];
                $rootScope.isUserProjectLead = $scope.isUserProjectLead;

                $scope.project.editedLabels = $scope.project.Labels.map(function (label) {
                    return label.Name;
                });

                $scope.project.Priorities = $scope.project.Priorities.map(function (priority) {
                    return priority.Name;
                });

                $scope.project.projectPriorities = $scope.project.Priorities.join(', ');

                issuesService.getIssuesForProject($route.current.params.id)
                    .then(function (response) {
                        $scope.issues = response.data;
                        var endIndex = $scope.paginationParams.pageNumber * $scope.paginationParams.pageSize;
                        var startIndex = 0;

                        $scope.shownIssues = $scope.issues.slice(startIndex, endIndex);
                    });

                usersService.getAllUsers()
                    .then(function (response) {
                        $scope.users = response.data;
                        $scope.project.selectedUser = $scope.users.filter(function (user) {
                            return user.Id === $scope.project.Lead.Id;
                        })[0];
                    });
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

        $scope.isAdmin = authService.isAdmin();

        $scope.openAddIssueModal = function() {
            $uibModal.open({
                templateUrl : 'views/add-issue.html',
                controller: 'AddIssueModalController',
                backdrop: 'static',
                keyboard: false
            });
        };
    }
]);