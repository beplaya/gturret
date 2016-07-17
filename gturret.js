
var distanceToScreenCM = 100;
var screenDimsCM = { x: 10, y: 10};

require(__dirname+'/gpio_server.js')(function(gpioServer) {
	
	
	var servoX = require(__dirname+"/servo_controller.js")(gpioServer, 17, "x-axis");
	var servoZ = require(__dirname+"/servo_controller.js")(gpioServer, 18, "z-axis");

	var turret = require(__dirname+"/two_axis_servo_controller.js")(servoX, servoZ);

	turret.setScreenDistanceCM(distanceToScreenCM,
			screenDimsCM.x, screenDimsCM.y);

	var frequency = 100;
	var locations = [];
	var index = 0;
	var step = .5;
	//
	for(var x=1; x<=10; x+=step)
	    locations.push([x, 1]);
	for(var y=1; y<=10; y+=step)
	    locations.push([10, y]);
    for(var x=10; x>=1; x-=step)
	    locations.push([x, 10]);
	for(var y=10; y>=1; y-=step)
	    locations.push([1, y]);

	locations.push([5, 5]);
	locations.push([5, 5]);
	locations.push([5, 5]);
	//

    var totalRunTime = 2*(locations.length)*frequency;
    var runTime = 0;
    var timerIntervalFrequency = 1000;
    var timerInterval = setInterval(function(){
                runTime += timerIntervalFrequency;
                console.log('Run time (s):', runTime, ' Time left (s):', (totalRunTime-runTime));
                turret.log();
            }, timerIntervalFrequency);
	var servoUpdateInterval = setInterval(function(){
		//console.log(locations[index][0], locations[index][1]);
		turret.goToCoordinate(locations[index][0], locations[index][1]);
		index++;
		index = index >= locations.length ? 0 :index; 
	}, frequency);
	//#
	setTimeout(function() { turret.goToPercentage(0, 0); gpioServer.end(); clearInterval(servoUpdateInterval); clearInterval(timerInterval);}, totalRunTime);
});