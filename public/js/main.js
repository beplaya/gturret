angular.module("angularapp", []);
angular.module("angularapp").controller("servoController", function($scope){
    $scope.servos = [ ];
    $scope.servos.push(new Servo("x"));
    $scope.servos.push(new Servo("z"));

});


function Servo(axis){
    this.axis = axis;
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