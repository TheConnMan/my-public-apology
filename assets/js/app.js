angular.module('app', ['ngResource', 'ngRoute', 'angularMoment'])
.controller('MainController', ['$scope', '$resource', '$route', '$routeParams', '$location', function($scope, $resource, $route, $routeParams, $location) {

  var Apology = $resource('/apology/:apologyId', {
    apologyId: '@id'
  });

  $scope.apologies = Apology.query({
    limit: 20,
    sort: 'createdAt DESC'
  });
}])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
      templateUrl : "/templates/index.html"
  });
}]);
