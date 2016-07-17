"use strict";

app.controller(
        "servoController",
        ["socket",
        function($scope, socket){
    $scope.servos = [ ];
    $scope.servos.push(new Servo("x", socket));
    $scope.servos.push(new Servo("z", socket));

}]);


function Servo(axis, socket){
    this.axis = axis;
    this.socket = socket;
    this.percent = 0;
    this.percentStep = 1;

    this.onCCW = function(servo) {
        console.log("ccw", this.axis);
        if(this.percent - this.percentStep >= 0){
            this.percent -= this.percentStep;
        }
    };

    this.onCW = function(servo) {
        console.log("cw", this.axis);
        if(this.percent + this.percentStep <= 100){
            this.percent += this.percentStep;
        }
    };
}