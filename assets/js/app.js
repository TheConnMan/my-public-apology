angular.module('app', ['ngResource', 'ngRoute', 'angularMoment'])
.controller('MainController', ['$scope', '$resource', '$route', '$routeParams', '$location', function($scope, $resource, $route, $routeParams, $location) {

  $scope.Apology = $resource('/apology/:apologyId', {
    apologyId: '@id'
  });

  $scope.apologies = $scope.Apology.query({
    limit: 20,
    sort: 'createdAt DESC'
  });

  $scope.viewApology = function(apology) {
    $location.path('/apology/' + apology.user.name.toLowerCase().split(' ').join('-') + '/' + apology.id);
  };
}])

.controller('CreateApologyController', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location) {
  $scope.params = $routeParams;

  $scope.apologyId = $scope.params.apologyId;

  $scope.apology = $scope.apologyId ? $scope.Apology.get({
    apologyId: $scope.params.apologyId
  }) : new $scope.Apology();

  $scope.save = function() {
    $scope.apology.$save().then(function(apology) {
      return $scope.Apology.get({
        apologyId: apology.id
      }).$promise;
    }).then(function(apology) {
      $location.path('/apology/' + apology.user.name.toLowerCase().split(' ').join('-') + '/' + apology.id);
    }).catch(function(err) {
      $scope.error = err.data;
    });
  };
}])

.controller('ApologyController', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location) {
  $scope.params = $routeParams;

  $scope.apology = $scope.Apology.get({
    apologyId: $scope.params.apologyId
  });
}])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
      templateUrl : "/templates/index.html"
  })
 .when('/create', {
    templateUrl: '/templates/createApology.html',
    controller: 'CreateApologyController'
  })
 .when('/edit/:apologyId', {
    templateUrl: '/templates/createApology.html',
    controller: 'CreateApologyController'
  })
 .when('/apology/:user/:apologyId', {
    templateUrl: '/templates/apology.html',
    controller: 'ApologyController'
  });
}]);
