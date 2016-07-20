"use strict";

app.controller('servoController', ['$scope','$rootScope', 'socket',
                    function($scope, $rootScope, socket) {
    $scope.servos = [ ];
    var xServo = new Servo("x", socket);
    var zServo = new Servo("z", socket, true)
    $scope.servos.push(xServo);
    $scope.servos.push(zServo);
    $scope.turret = new Turret(socket, xServo, zServo);

    $scope.updateAllServos = function() {
        for(var i=0; i<$scope.servos.length; i++){
            $scope.servos[i].update();
        }
    };

}]);

function Turret(socket, xServo, zServo) {
    this.socket = socket;
    this.servos = {x:xServo, z:zServo};
    this.center = {x:0, z:0};
    this.modes = ["POINT", "RANDOM"];
    this.mode = this.modes[0];


    this.setMode = function(mode) {
        var self = this;
        self.mode = mode;
        self.socket.emit('web_turret_setMode', {mode:self.mode}, function (result) {});
    };

    this.setCenter = function() {
        var self = this;
        self.center = {x:self.servos.x.getPercentToSend(), z:self.servos.z.getPercentToSend()};
        self.socket.emit('web_turret_setCenterPercent', {center: self.center}, function (result) {});
    };
    this.setCenter();
}

function Servo(axis, socket, invert){
    this.axis = axis;
    this.invert = invert || false;
    this.socket = socket;
    this.percent = 0;
    this.percentStep = 2;

    this.getPercentToSend = function(){
        return this.invert ? (100-this.percent) : this.percent;
    }

    this.onCCW = function(servo) {
        var self = this;
        console.log("ccw", self.axis);
        if(self.percent - self.percentStep >= 0){
            self.percent -= self.percentStep;
        }

        self.socket.emit('web_gotoPercent', {axis:[self.axis], percent:self.getPercentToSend()}, function (result) {});
    };

    this.onCW = function(servo) {
        var self = this;
        console.log("cw", self.axis);
        if(self.percent + self.percentStep <= 100){
            self.percent += self.percentStep;
        }
        self.update();
    };

    this.update = function(){
        var self = this;
        self.socket.emit('web_gotoPercent', {axis:self.axis, percent:self.getPercentToSend()}, function (result) {});
    };
}