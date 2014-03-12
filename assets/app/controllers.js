(function (app) {
  'use strict';

  var homeController = function ($scope) { };
  app.controller('HomeCtrl', ['$scope', homeController]);

  var contactCtrl = function ($scope) { };
  app.controller('ContactCtrl', ['$scope', contactCtrl]);

  var errorController = function ($scope) {

  };
  app.controller('ErrorCtrl', ['$scope', errorController]);

  var GearStream = function ($scope) {};
  app.controller('GearStream', ['$scope', GearStream]);

})(angular.module('app'));


(function (app) {
  'use strict';

  var homeController = function ($scope) {
    $scope.data = [
      {name: "Mtn. Dew Consumption", ounces: 144},
      {name: "Mtn. Dew during project", ounces: 244}
    ];


  };
  app.controller('HomeCtrl', ['$scope', homeController]);

  var contactCtrl = function ($scope) { };
  app.controller('ContactCtrl', ['$scope', contactCtrl]);

  var errorController = function ($scope) {

  };
  app.controller('ErrorCtrl', ['$scope', errorController]);


})(angular.module('app-gearstream'));