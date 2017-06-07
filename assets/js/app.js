angular.module('app', ['ngResource', 'ngRoute', 'angularMoment', 'infinite-scroll'])
.controller('MainController', ['$scope', '$resource', '$route', '$routeParams', '$location', '$window', function($scope, $resource, $route, $routeParams, $location, $window) {

  $scope.$on('$viewContentLoaded', function(event) {
    if ($window.ga) {
      $window.ga('send', 'pageview', { page: $location.url() });
    }
  });

  $scope.Apology = $resource('/apology/:apologyId', {
    apologyId: '@id'
  });

  $scope.landingPage = function() {
    $location.path('/');
  };

  $scope.createApology = function() {
    $location.path('/create');
  };

  $scope.myApology = function(apology) {
    return apology.user && apology.user.id === userId;
  };

  $scope.viewApology = function(apology) {
    $location.path('/apology/' + apology.user.name.split(' ').join('-') + '/' + apology.id);
  };

  $scope.editApology = function(apology) {
    $location.path('/edit/' + apology.id);
  };

  $scope.showUser = function(user) {
    $location.path('/' + user.name.split(' ').join('-'));
  };

  $scope.myApologies = function() {
    $location.path('/' + username.split(' ').join('-'));
  };
}])

.controller('LandingController', ['$scope', '$resource', '$route', '$routeParams', '$location', function($scope, $resource, $route, $routeParams, $location) {

  $scope.params = $routeParams;
  $scope.username = $scope.params.userName ? $scope.params.userName.split('-').join(' ') : null;

  $scope.page = 0;
  $scope.pageSize = 10;
  $scope.done = false;
  $scope.loading = false;

  $scope.apologies = [];

  $scope.nextPage = function() {
    if (!$scope.done && !$scope.loading) {
      $scope.loading = true;
      $scope.Apology.query({
        username: $scope.username,
        limit: $scope.pageSize,
        skip: $scope.pageSize * $scope.page,
        sort: 'createdAt DESC'
      }).$promise.then(function(apologies) {
        $scope.apologies = $scope.apologies.concat(apologies);
        $scope.page++;
        $scope.done = $scope.done || apologies.length === 0;
        $scope.loading = false;
      });
    }
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
      $location.path('/apology/' + apology.user.name.split(' ').join('-') + '/' + apology.id);
    }).catch(function(err) {
      $scope.error = err.data;
    });
  };
}])

.controller('ApologyController', ['$scope', '$route', '$routeParams', '$location', '$http', function($scope, $route, $routeParams, $location, $http) {
  $scope.params = $routeParams;

  $scope.apology = $scope.Apology.get({
    apologyId: $scope.params.apologyId
  }, function() {
    if ($scope.apology.id) {
      $http.get('/apology/view/' + $scope.apology.id);
    }
  });
}])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
      templateUrl : "/templates/index.html",
      controller: 'LandingController'
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
  })
  .when('/:userName', {
      templateUrl : "/templates/index.html",
      controller: 'LandingController'
  });
}]);
