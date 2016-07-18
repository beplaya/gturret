"use strict";

app.controller('servoController', ['$scope','$rootScope', 'socket',
                    function($scope, $rootScope, socket) {
    $scope.servos = [ ];
    $scope.servos.push(new Servo("x", socket));
    $scope.servos.push(new Servo("z", socket, true));

}]);


function Servo(axis, socket, invert){
    this.axis = axis;
    this.invert = invert || false;
    this.socket = socket;
    this.percent = 0;
    this.percentStep = 5;

    this.getPercentToSend = function(){
        return this.invert ? (100-this.percent) : this.percent;
    }

    this.onCCW = function(servo) {
        var self = this;
        console.log("ccw", self.axis);
        if(self.percent - self.percentStep >= 0){
            self.percent -= self.percentStep;
        }

        self.socket.emit('web_gotoPercent', {axis:self.axis, percent:self.getPercentToSend()}, function (result) {});
    };

    this.onCW = function(servo) {
        var self = this;
        console.log("cw", self.axis);
        if(self.percent + self.percentStep <= 100){
            self.percent += self.percentStep;
            self.socket.emit('web_gotoPercent', {axis:self.axis, percent:self.getPercentToSend()}, function (result) {});
        }
    };
}