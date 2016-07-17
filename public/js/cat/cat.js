angular.module("cat", ["ngRoute"]);

angular.module("cat").controller('meowController', ['$scope', function($scope){
	
	$scope.meow = "meow meow meow";
}]);

angular.module("cat").config(function($routeProvider){
	$routeProvider.when('/cat', {
		templateUrl : 'js/cat/cat.html',
		controller  : 'meowController'
	})
	.when('/test', {
		templateUrl : 'cat.html',
		controller  : 'meowController'
	});
});
