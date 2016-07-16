
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

	var frequency = 500;
	var locations = [];
	var index = 0;
	//
	locations.push([0,0]);
	locations.push([5,0]);
	locations.push([0,0]);
	locations.push([0,5]);
	locations.push([2,2]);
	locations.push([5,5]);
	locations.push([4,5]);
	locations.push([4,4]);
	locations.push([3,4]);
	locations.push([3,3]);
	locations.push([2,3]);
	locations.push([2,2]);
	locations.push([1,2]);
	locations.push([1,1]);
	locations.push([0,1]);
	locations.push([0,0]);
	locations.push([2,0]);
	locations.push([2,2]);
	locations.push([2,3]);
	locations.push([2,4]);
	locations.push([2,5]);
	locations.push([2,4]);
	locations.push([2,3]);
	locations.push([2,2]);
	locations.push([2,1]);
	locations.push([2,0]);
	//
	locations.push([0, 0]);
	//
	var servoUpdateInterval = setInterval(function(){
		turret.goToCoordinate(locations[index][0], locations[index][1]);
		index++;
		index = index >= locations.length ? 0 :index; 
	}, frequency);
	//#
	setTimeout(function() {gpioServer.end(); clearInterval(servoUpdateInterval)}, 3 * ((locations.length)*frequency));
});