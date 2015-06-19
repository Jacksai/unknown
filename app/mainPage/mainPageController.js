(function () {
	'use strict';

	angular
		.module('undefinedApp')
		.controller('MainPageController', MainPageController); 

		MainPageController.$inject = ['$scope'];

		function MainPageController ($scope) {

			var vm = this;

			vm.message = 'Hello World';
		}

})();