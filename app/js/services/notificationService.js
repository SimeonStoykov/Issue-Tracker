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

            function showError(message, error) {
                var allErrors = [];
                if (error && error.data && error.data.error_description) {
                    allErrors.push(error.data.error_description);
                }
                if (error && error.data && error.data.ModelState) {
                    var modelErrors = error.data.ModelState;
                    for (var key in modelErrors) {
                        var modelErrorsMessages = modelErrors[key];

                        modelErrorsMessages.forEach(function (currentError) {
                            allErrors.push(currentError);
                        });
                    }
                }
                if (allErrors.length > 0) {
                    message += "<br />" + allErrors.join("<br />");
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