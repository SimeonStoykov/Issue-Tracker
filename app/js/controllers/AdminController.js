'use strict';

angular.module('issueTracker')
    .controller('AdminController', [
        '$scope',
        '$route',
        'usersService',
        'notificationService',
        function AdminController($scope, $route, usersService, notificationService) {
            usersService.getAllUsers()
                .then(function (response) {
                    $scope.users = response.data;
                    $scope.users = $scope.users.filter(function (user) {
                        return user.isAdmin === false;
                    });
                    $scope.selectedUser = $scope.users ? $scope.users[0] : '';
                }, function (error) {
                    notificationService.showError('Error taking users data', error);
                });

            $scope.makeAdmin = function () {
                var data = {
                    UserId: $scope.selectedUser.Id
                };

                usersService.makeAdmin(data)
                    .then(function () {
                        notificationService.showInfo('User ' + $scope.selectedUser.Username + ' is now admin!');
                        $route.reload();
                    }, function (error) {
                        notificationService.showError('Error making user admin', error);
                    });
            }
        }
    ]);