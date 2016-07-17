angular.module("color", ["ngRoute"]);

angular.module('color').config(function($routeProvider){
	$routeProvider.when('/color',{
		templateUrl : "js/color/color.html",
		controller : "colorController"
	});
})
.controller('colorController', ['$scope', function($scope){
	$scope.color = "red";
}])