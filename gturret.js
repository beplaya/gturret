
var distanceToScreenCM = 10;
var screenDimsCM = { x: 10, y: 10};

/*var gpioServer = {
    applyPulseWidth : function(pw, servoController) {
        console.log('applyPulseWidth', pw, servoController.pin, servoController.name);
    }
};*/

require(__dirname+'/gpio_server.js')(function(gpioServer) {

	var servoX = require(__dirname+"/servo_controller.js")(gpioServer, 17, "x-axis");
	var servoZ = require(__dirname+"/servo_controller.js")(gpioServer, 18, "z-axis");

	var turret = require(__dirname+"/two_axis_servo_controller.js")(servoX, servoZ);

	turret.setScreenDistanceCM(distanceToScreenCM,
			screenDimsCM.x, screenDimsCM.y);


	setTimeout(function() {turret.goToCoordinate(0, 0)}, 1000);
	setTimeout(function() {turret.goToCoordinate(10, 10)}, 2000);
	setTimeout(function() {turret.goToCoordinate(0, 10)}, 3000);
	setTimeout(function() {turret.goToCoordinate(10, 0)}, 4000);
	setTimeout(function() {turret.goToCoordinate(5, 5)}, 5000);
	setTimeout(function() {turret.goToCoordinate(0, 0)}, 6000);
	
	
	gpioServer.end();
});