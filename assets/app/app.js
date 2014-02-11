(function (app) {
  'use strict';

  var configuration = function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', { templateUrl: '/templates/index.html', controller: 'HomeCtrl'})
      .when('/contact', {templateUrl: '/templates/contact/index.html', controller: 'ContactCtrl'})
      .when('/404', {templateUrl: '/templates/errors/404.html', controller: 'ErrorCtrl'})
      .otherwise({redirectTo: '/404'});

    $locationProvider.hashPrefix('!');
  };

  app.config(configuration);
})(angular.module('app', ['ngRoute', 'angular-redactor']));