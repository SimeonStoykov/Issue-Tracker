'use strict';

angular.module('issueTracker')
    .factory('notificationService', [
        function () {
            function showInfo(message) {
                noty({
                        text: message,
                        type: 'success',
                        layout: 'topCenter',
                        timeout: 2500
                    }
                );
            }

            function showError(message, serverError) {
                var errors = [];
                if (serverError && serverError.data && serverError.data.error_description) {
                    errors.push(serverError.data.error_description);
                }
                if (serverError && serverError.data && serverError.data.ModelState) {
                    var modelStateErrors = serverError.data.ModelState;
                    for (var property in modelStateErrors) {
                        var errorMessages = modelStateErrors[property];

                        for (var i = 0; i < errorMessages.length; i++) {
                            var currentError = errorMessages[i];
                            errors.push(currentError);
                        }
                    }
                }
                if (errors.length > 0) {
                    message = message + "<br/>" + errors.join("<br />");
                }
                noty({
                        text: message,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 2500
                    }
                );
            }

            return {
                showInfo: showInfo,
                showError: showError
            }
        }
    ]);