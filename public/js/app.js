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

  var configuration = function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', { templateUrl: '/templates/gearstream/index.html', controller: 'HomeCtrl'})
      .when('/404', {templateUrl: '/templates/errors/404.html', controller: 'ErrorCtrl'})
      .otherwise({redirectTo: '/404'});

    $locationProvider.hashPrefix('!');
  };


  var d3Bars = function ($window, $timeout, d3Service) {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        label: '@',
        onClick: '&'
      },
      link: function (scope, ele, attrs) {
        d3Service.d3().then(function (d3) {

          var renderTimeout;
          var margin = parseInt(attrs.margin) || 0,
            barHeight = parseInt(attrs.barHeight) || 50,
            barPadding = parseInt(attrs.barPadding) || 0;

          var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%');

          $window.onresize = function () {
            scope.$apply();
          };

          scope.$watch(function () {
            return angular.element($window)[0].innerWidth;
          }, function () {
            scope.render(scope.data);
          });

          scope.$watch('data', function (newData) {
            scope.render(newData);
          }, true);

          scope.render = function (data) {
            svg.selectAll('*').remove();

            if (!data) return;
            if (renderTimeout) clearTimeout(renderTimeout);

            renderTimeout = $timeout(function () {
              var width = d3.select(ele[0])[0][0].offsetWidth - margin,
                height = scope.data.length * (barHeight + barPadding),
                color = d3.scale.category20(),
                xScale = d3.scale.linear()
                  .domain([0, d3.max(data, function (d) {
                    return d.ounces;
                  })])
                  .range([0, width]);

              svg.attr('height', height);

              svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .on('click', function (d, i) {
                  return scope.onClick({item: d});
                })
                .attr('height', barHeight)
                .attr('width', 140)
                .attr('x', Math.round(margin / 2))
                .attr('y', function (d, i) {
                  return i * (barHeight + barPadding);
                })
                .attr('fill', function (d) {
                  return color(d.ounces);
                })
                .transition()
                .duration(1000)
                .attr('width', function (d) {
                  return xScale(d.ounces);
                });
              svg.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('fill', '#fff')
                .attr('y', function (d, i) {
                  return i * (barHeight + barPadding) + 15;
                })
                .attr('x', 15)
                .text(function (d) {
                  return d.name + "  (" + d.ounces + " oz)";
                });
            }, 200);
          };
        });
      }}
  };
  app.directive('d3Bars', ['$window', '$timeout', 'd3Service', d3Bars]);

  app.config(configuration);
})
(angular.module('app-gearstream', ['ngRoute', 'angular-redactor', 'ui.bootstrap', 'd3']));


(function (app) {
  "use strict";

  var d3Service = function ($window, $document, $q, $rootScope) {
    var d = $q.defer(),
      d3service = {
        d3: function () { return d.promise; }
      };

    function onScriptLoad() {
      // Load client in the browser
      $rootScope.$apply(function () { d.resolve($window.d3); });
    }

    var scriptTag = $document[0].createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.async = true;
    scriptTag.src = 'http://d3js.org/d3.v3.min.js';
    scriptTag.onreadystatechange = function () {
      if (this.readyState == 'complete') onScriptLoad();
    }
    scriptTag.onload = onScriptLoad;

    var s = $document[0].getElementsByTagName('body')[0];
    s.appendChild(scriptTag);

    return d3service;
  };

  app.factory('d3Service', ['$window', '$document', '$q', '$rootScope', d3Service]);

})(angular.module('d3', []));
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