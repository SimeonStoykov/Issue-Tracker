issueTracker.controller('ProjectsController', [
    '$scope',
    'projectsService',
    'issuesService',
    '$routeParams',
    'authService',
    'usersService',
    'labelsService',
    '$location',
    'notificationService',
    '$uibModal',
    function ProjectsController($scope, projectsService, issuesService, $routeParams, authService,
                                usersService, labelsService, $location, notificationService, $uibModal) {

        projectsService.getProjectById($routeParams.id)
            .then(function (response) {
                $scope.project = response.data;
                $scope.isUserProjectLead = $scope.project.Lead.Id === localStorage['currentUserId'];

                $scope.project.editedLabels = $scope.project.Labels.map(function (label) {
                    return label.Name;
                });

                $scope.project.Priorities = $scope.project.Priorities.map(function (priority) {
                    return priority.Name;
                });

                $scope.project.projectPriorities = $scope.project.Priorities.join(', ');

                $scope.getIssuesForProject();

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

        $scope.getIssuesForProject = function () {
            issuesService.getIssuesForProject($routeParams.id)
                .then(function (response) {
                    $scope.issues = response.data;
                    var endIndex = $scope.paginationParams.pageNumber * $scope.paginationParams.pageSize;
                    var startIndex = 0;

                    $scope.shownIssues = $scope.issues.slice(startIndex, endIndex);
                });
        };

        $scope.isAdmin = authService.isAdmin();

        $scope.editProject = function (project) {
            var prioritiesToAdd = project.projectPriorities.split(', ').map(function (priority) {
                return {
                    Name: priority
                };
            });

            var labelsToAdd = $scope.project.editedLabels.map(function (label) {
                return {
                    Name: label
                };
            });

            var projectToEdit = {
                Name: project.Name,
                Description: project.Description,
                priorities: prioritiesToAdd,
                labels: labelsToAdd,
                LeadId: project.selectedUser.Id
            };

            projectsService.editProject($routeParams.id, projectToEdit)
                .then(function (response) {
                    $location.path("projects/" + $routeParams.id);
                    notificationService.showInfo('Project edited successfully!');
                }, function (error) {
                    notificationService.showError('Editing project failed!', error);
                });
        };

        $scope.addLabel = function (label) {
            $scope.project.editedLabels.push(label);
            $scope.labelToAdd = '';
        };

        $scope.removeLabel = function (label) {
            var indexOfTheLabel = $scope.project.editedLabels.indexOf(label);
            $scope.project.editedLabels.splice(indexOfTheLabel, 1);
        };

        $scope.modelOptions = {
            debounce: {
                default: 100,
                blur: 100
            },
            getterSetter: true
        };

        var params = {
            filter: $scope.labelToAdd ? $scope.labelToAdd : ''
        };

        $scope.getLabels = function () {
            labelsService.getLabels(params)
                .then(function (response) {
                    $scope.labels = response.data;
                });
        };

        $scope.openAddIssueModal = function() {
            $uibModal.open({
                templateUrl : 'views/add-issue.html',
                controller: 'AddIssueModalController'
            });
        };
    }
]);