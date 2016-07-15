
var distanceToScreenCM = 10;
var screenDimsCM = { x: 10, y: 10};

var gpioServer = {
    applyPulseWidth : function(pw) {
        console.log('applyPulseWidth', pw);
    }
};
var servoZ = require(__dirname+"/servo_controller.js")(gpioServer, 14);
var servoX = require(__dirname+"/servo_controller.js")(gpioServer, 18);

var twoAxisController = require(__dirname+"/two_axis_servo_controller.js")();

twoAxisController.setScreenDistanceCM(distanceToScreenCM,
        screenDimsCM.x, screenDimsCM.y);


