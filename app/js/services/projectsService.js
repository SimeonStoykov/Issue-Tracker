'use strict';

angular.module('issueTracker')
    .factory('projectsService', [
        '$http',
        '$q',
        'BASE_URL',
        'issuesService',
        function ($http, $q, BASE_URL, issuesService) {

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
                        var notDistinctAffiliatedProjects = issues.map(function (issue) {
                            return issue.Project;
                        });

                        var projectsParams = {
                            pageNumber: 1,
                            pageSize: 2147483647,
                            filter: 'Lead.Id = "' + localStorage['currentUserId'] + '"'
                        };

                        getAllProjects(projectsParams)
                            .then(function (projectsResponse) {
                                projectsResponse.data.Projects.forEach(function (project) {
                                    notDistinctAffiliatedProjects.push({
                                        Id: project.Id,
                                        Name: project.Name
                                    });
                                });

                                var flags = {};
                                var affiliatedProjects = notDistinctAffiliatedProjects.filter(function(project) {
                                    if (flags[project.Id]) {
                                        return false;
                                    }
                                    flags[project.Id] = true;
                                    return true;
                                });

                                deffered.resolve(affiliatedProjects);
                            })
                    }, function (error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            function editProject(id, projectData) {
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
                    .then(function (response) {
                        var project = response.data;
                        var isUserProjectLead = project.Lead.Id === localStorage['currentUserId'];
                        deffered.resolve(isUserProjectLead);
                    }, function (error) {
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