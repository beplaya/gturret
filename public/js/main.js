angular.module("angularapp", []);
angular.module("angularapp").controller("servoController", function($scope){
    $scope.servos = [ ];
    $scope.servos.push(new Servo("x"));
    $scope.servos.push(new Servo("z"));

});


function Servo(axis){
    this.axis = axis;
}