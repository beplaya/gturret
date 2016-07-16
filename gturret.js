
var distanceToScreenCM = 10;
var screenDimsCM = { x: 10, y: 10};

/*var gpioServer = {
    applyPulseWidth : function(pw, servoController) {
        console.log('applyPulseWidth', pw, servoController.pin, servoController.name);
    }
};*/

require(__dirname+'/gpio_server.js')(function(gpioServer) {

	var servoX = require(__dirname+"/servo_controller.js")(gpioServer, 18, "x-axis");
	var servoZ = require(__dirname+"/servo_controller.js")(gpioServer, 14, "z-axis");

	var turret = require(__dirname+"/two_axis_servo_controller.js")(servoX, servoZ);

	turret.setScreenDistanceCM(distanceToScreenCM,
			screenDimsCM.x, screenDimsCM.y);


	turret.goToCoordinate(1, 9);
	
	gpioServer.end();
});