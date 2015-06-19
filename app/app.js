(function () {
	'use strict';

	angular
		.module('undefinedApp', ['ngRoute', 'ngAnimate']);

	angular
		.module('undefinedApp')
		.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
			$locationProvider.hashPrefix('!');
			//routes
			$routeProvider
				.when('/', {
					templateUrl: './mainPage/mainPage.html',
					controller: 'MainPageController as mainpage'
				})
				.otherwise({
					redirectTo: '/'
				});
		}]);

})();