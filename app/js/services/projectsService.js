'use strict';

angular.module('issueTracker')
    .factory('projectsService', [
        '$http',
        '$q',
        'BASE_URL',
        'issuesService',
        'usersService',
        'INITIAL_PAGE_NUMBER',
        'MAX_ITEMS_COUNT',
        function($http, $q, BASE_URL, issuesService, usersService, INITIAL_PAGE_NUMBER, MAX_ITEMS_COUNT) {

            function getAllProjects(params) {
                var deffered = $q.defer();

                var config = {
                    params: params
                };

                $http.get(BASE_URL + 'Projects', config)
                    .then(function(result) {
                        deffered.resolve(result);
                    }, function(error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            function getProjectById(id) {
                var deffered = $q.defer();

                $http.get(BASE_URL + 'Projects/' + id)
                    .then(function(result) {
                        deffered.resolve(result);
                    }, function(error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            function getAffiliatedProjects() {
                var deffered = $q.defer();

                var issuesParams = {
                    pageNumber: INITIAL_PAGE_NUMBER,
                    pageSize: MAX_ITEMS_COUNT,
                    orderBy: 'DueDate'
                };

                issuesService.getCurrentUserIssues(issuesParams)
                    .then(function(response) {
                        var issues = response.data.Issues;
                        var notDistinctAffiliatedProjects = issues.map(function(issue) {
                            return issue.Project;
                        });

                        var projectsParams = {
                            pageNumber: INITIAL_PAGE_NUMBER,
                            pageSize: MAX_ITEMS_COUNT,
                            filter: 'Lead.Id = "' + localStorage['currentUserId'] + '"'
                        };

                        getAllProjects(projectsParams)
                            .then(function(projectsResponse) {
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
                    }, function(error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            function editProject(id, projectData) {
                var deffered = $q.defer();

                $http.put(BASE_URL + 'Projects/' + id, projectData)
                    .then(function(result) {
                        deffered.resolve(result);
                    }, function(error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            function isUserProjectLead(projectId) {
                var deffered = $q.defer();

                getProjectById(projectId)
                    .then(function(response) {
                        var project = response.data;

                        usersService.getCurrentUserInfo()
                            .then(function(response) {
                                console.log(response);
                            });

                        var isUserProjectLead = project.Lead.Id === localStorage['currentUserId'];
                        deffered.resolve(isUserProjectLead);
                    }, function(error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            function addNewProject(projectData) {
                var deffered = $q.defer();

                $http.post(BASE_URL + 'Projects', projectData)
                    .then(function(result) {
                        deffered.resolve(result);
                    }, function(error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            return {
                getAllProjects: getAllProjects,
                getProjectById: getProjectById,
                getAffiliatedProjects: getAffiliatedProjects,
                editProject: editProject,
                isUserProjectLead: isUserProjectLead,
                addNewProject: addNewProject
            };
        }
    ]);