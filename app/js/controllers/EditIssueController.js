'use strict';
issueTracker.controller('EditIssueController', [
    '$scope',
    'issuesService',
    'projectsService',
    '$route',
    'notificationService',
    'usersService',
    'labelsService',
    function EditIssueController($scope, issuesService, projectsService, $route, notificationService, usersService, labelsService) {

        issuesService.getIssueById($route.current.params.id)
            .then(function (response) {
                $scope.issue = response.data;

                $scope.issue.DueDate = new Date($scope.issue.DueDate);

                $scope.issue.labels = $scope.issue.Labels.map(function(label){
                    return label.Name;
                });

                projectsService.getProjectById($scope.issue.Project.Id)
                    .then(function (response) {
                        $scope.project = response.data;

                        $scope.priorities = $scope.project.Priorities;

                        $scope.issue.priority = $scope.priorities.filter(function(priority){
                            return priority.Id === $scope.issue.Priority.Id;
                        })[0];

                        usersService.getAllUsers()
                            .then(function(response){
                                $scope.users = response.data;

                                $scope.issue.assignee = $scope.users.filter(function(user){
                                    return user.Id === $scope.issue.Assignee.Id;
                                })[0];
                            });
                    });
            });

        $scope.changeIssueStatus = function (statusId) {

            var params = {
                statusid: statusId
            };

            issuesService.changeIssueStatus($route.current.params.id, params)
                .then(function(response) {
                    $route.reload();
                    notificationService.showInfo('Issue status changed successfully!');
                }, function (error) {
                    notificationService.showError('Issue status changing failed!', error);
                });
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

        $scope.addLabel = function (label) {
            $scope.issue.labels.push(label);
            $scope.labelToAdd = '';
        };

        $scope.removeLabel = function (label) {
            var indexOfTheLabel = $scope.issue.labels.indexOf(label);
            $scope.issue.labels.splice(indexOfTheLabel, 1);
        };
    }
]);