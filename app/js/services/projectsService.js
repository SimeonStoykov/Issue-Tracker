'use strict';
issueTracker.factory('projectsService', [
    '$http',
    '$q',
    'BASE_URL',
    'issuesService',
    '$routeParams',
    function ($http, $q, BASE_URL, issuesService, $routeParams) {

        function getAllProjects(params) {
            var deffered = $q.defer();

            var config = {
                params: params
            };

            $http.get(BASE_URL + 'Projects', config)
                .then(function (result) {
                    deffered.resolve(result);
                }, function (error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        function getProjectById(id) {
            var deffered = $q.defer();

            $http.get(BASE_URL + 'Projects/' + id)
                .then(function (result) {
                    deffered.resolve(result);
                }, function (error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        function getAffiliatedProjects() {
            var deffered = $q.defer();

            var issuesParams = {
                pageNumber: 1,
                pageSize: 2147483647,
                orderBy: 'DueDate'
            };

            issuesService.getCurrentUserIssues(issuesParams)
                .then(function (response) {
                    var issues = response.data.Issues;

                    var relatedProjectsIds = issues.map(function (issue) {
                        return issue.Project.Id;
                    });

                    var projectsParams = {
                        pageNumber: 1,
                        pageSize: 2147483647,
                        filter: ''
                    };

                    getAllProjects(projectsParams)
                        .then(function(projectsResponse){
                            var allProjects = projectsResponse.data.Projects;

                            var affiliatedProjects = allProjects.filter(function(project){
                                return project.Lead.Id === localStorage['currentUserId']
                                    || relatedProjectsIds.indexOf(project.Id) !== -1;
                            });

                            deffered.resolve(affiliatedProjects);
                        })
                }, function(error){
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        function editProject(id, projectData){
            var deffered = $q.defer();

            $http.put(BASE_URL + 'Projects/' + id, projectData)
                .then(function (result) {
                    deffered.resolve(result);
                }, function (error) {
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        function isUserProjectLead(projectId) {
            var deffered = $q.defer();

            getProjectById(projectId)
                .then(function(response) {
                    var project = response.data;
                    var isUserProjectLead =  project.Lead.Id === localStorage['currentUserId'];
                    deffered.resolve(isUserProjectLead);
                }, function (error){
                    deffered.reject(error);
                });

            return deffered.promise;
        }

        return {
            getAllProjects: getAllProjects,
            getProjectById: getProjectById,
            getAffiliatedProjects: getAffiliatedProjects,
            editProject: editProject,
            isUserProjectLead: isUserProjectLead
        };
    }
]);