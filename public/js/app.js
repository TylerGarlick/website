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
})(angular.module('app', ['ngRoute', 'angular-redactor', 'ui.bootstrap']));
(function (app) {
  'use strict';

  var homeController = function ($scope) {
//    $scope.slides = [
//      {
//        image: 'http://placehold.it/2400x600',
//        title: 'Relentless',
//        text: "I'm the guy on your team that will come up with solutions and new ideas until the team is satisfied with the results.  I'm also the guy who will work hand and hand with the team until success is achieved.  "
//      },
//      {
//        image: 'http://placehold.it/2400x600',
//        title: 'Proven Leadership',
//        text: ''
//      },
//      {
//        image: 'http://placehold.it/2400x600',
//        text: 'Some text'
//      }
//    ];

  };
  app.controller('HomeCtrl', ['$scope', homeController]);

  var contactCtrl = function ($scope) {

  };
  app.controller('ContactCtrl', ['$scope', contactCtrl]);


  var errorController = function ($scope) {

  };
  app.controller('ErrorCtrl', ['$scope', errorController]);


})(angular.module('app'));