

angular.module("angularapp", ["ngRoute", "cat", "color"]);

angular.module("angularapp").controller("controller1", function($scope, $http){
    $scope.defaultJob = "developer";
    $scope.colors = ["#f00", "#00f", "#0f0"];
    $scope.v = "this works in 'mydir'!";

	$scope.oc = function()
	{
	}
	
	$scope.adder = {
			add : function(){
				var responsePromise = $http.get("/rest/adder/add?a="+$scope.adder.a+"&b="+$scope.adder.b);
				
				responsePromise.success(function(data, status, headers, config) {
					$scope.adder.c = data.answer;
				});
				responsePromise.error(function(data, status, headers, config) {
				    alert("AJAX failed!");
				});
			}
	}
	$scope.myData = {};
    $scope.myData.doClick = function(item, event) {
    	console.log('do click');
        var responsePromise = $http.get("/rest/getdata");

        responsePromise.success(function(data, status, headers, config) {
            $scope.myData.fromServer = data.title;
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    }

});
angular.module("angularapp").directive('mydir', function(){
	return {
		restrict : "E",
		templateUrl : "templates/mydir.html",
		controller: 'controller1'
	};
})

angular.module("angularapp").controller("otherController", function($scope){
	$scope.name = "Jenny";
	
	
});
angular.module("angularapp").config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl : 'templates/home.html',
		controller  : 'controller1'
	}).when('/other', {
		templateUrl : 'templates/other.html',
		controller  : 'otherController'
	});
});


angular.module("angularapp").factory("F", function(){
	return {t : 'blah'};
});
angular.module("angularapp").controller("c1", function($scope, F, $http){
	$scope.F = F;
	$scope.v = "c1v";

});
angular.module("angularapp").controller("c2", function($scope, F){
	$scope.F = F;
	$scope.v = "c2v";
});

