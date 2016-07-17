
var distanceToScreenCM = 10;
var screenDimsCM = { x: 10, y: 10};

require(__dirname+'/gpio_server.js')(function(gpioServer) {
	
	
	var servoX = require(__dirname+"/servo_controller.js")(gpioServer, 17, "x-axis");
	var servoZ = require(__dirname+"/servo_controller.js")(gpioServer, 18, "z-axis");

	var turret = require(__dirname+"/two_axis_servo_controller.js")(servoX, servoZ);

	turret.setScreenDistanceCM(distanceToScreenCM,
			screenDimsCM.x, screenDimsCM.y);

	var frequency = 1000;
	var locations = [];
	var index = 0;
	//
	locations.push([.01, .01]);
	locations.push([.01, .01]);
	locations.push([.01, .01]);
	locations.push([.01, .01]);
	locations.push([.01, .01]);
	locations.push([10,10]);
	locations.push([10,10]);
	locations.push([10,10]);
	locations.push([10,10]);
	locations.push([10,10]);
	//
	locations.push([0, 0]);
	//
	var servoUpdateInterval = setInterval(function(){
		//console.log(locations[index][0], locations[index][1]);
		turret.goToCoordinate(locations[index][0], locations[index][1]);
		index++;
		index = index >= locations.length ? 0 :index; 
	}, frequency);
	//#
	setTimeout(function() { turret.goToCoordinate(0, 0); gpioServer.end(); clearInterval(servoUpdateInterval)}, 3 * ((locations.length)*frequency));
});