issueTracker.factory('projectsService', [
    '$http',
    '$q',
    'BASE_URL',
    'issuesService',
    '$routeParams',
    function ($http, $q, BASE_URL, issuesService, $routeParams) {

        function getAllProjects() {
            var deffered = $q.defer();

            $http.get(BASE_URL + 'Projects')
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

            var params = {
                pageNumber: 1,
                pageSize: 2147483647,
                orderBy: 'DueDate'
            };

            issuesService.getCurrentUserIssues(params)
                .then(function (response) {
                    var issues = response.data.Issues;

                    var relatedProjectsIds = issues.map(function (issue) {
                        return issue.Project.Id;
                    });

                    getAllProjects()
                        .then(function(projectsResponse){
                            var allProjects = projectsResponse.data;

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

        function isUserProjectLead() {
            var deffered = $q.defer();

            getProjectById($routeParams.id)
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