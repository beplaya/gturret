var args = process.argv.slice(2);
var distanceToScreenCM = args[0] || 50;
var screenDimsCM = { x: 10, y: 10};
var _gpioServer;
var socketApp = require(__dirname+"/web_server.js")();

var onGPIOConnectListener = function(gpioServer) {
    _gpioServer = gpioServer;
    console.log("@@");
    if(socketApp)
        console.log('socketApp is alive')
    else
        console.log('socketApp is dne')

	var servoX = require(__dirname+"/lib/servo_controller.js")(gpioServer, 17, "x-axis");
	var servoZ = require(__dirname+"/lib/servo_controller.js")(gpioServer, 18, "z-axis");

	var turret = require(__dirname+"/lib/two_axis_servo_controller.js")(servoX, servoZ);

	turret.setScreenDistanceCM(distanceToScreenCM,
			screenDimsCM.x, screenDimsCM.y);

	var frequency = 50;
	var locations = [];
	var index = 0;
	var step = 2;
	//
	for(var x=1; x<=10; x+=step)
	    locations.push([x, 1]);
	for(var y=1; y<=10; y+=step)
	    locations.push([10, y]);
    for(var x=10; x>=1; x-=step)
	    locations.push([x, 10]);
	for(var y=10; y>=1; y-=step)
	    locations.push([1, y]);

	//

    var totalRunTime = 3 * (locations.length)*frequency;
    var runTime = 0;
    var timerIntervalFrequency = 1000;
    var timerInterval = setInterval(function(){
                runTime += timerIntervalFrequency;
                console.log('Run time (s):', runTime/1000, ' Time left (s):', (totalRunTime-runTime)/1000);
                turret.log();
            }, timerIntervalFrequency);
	var servoUpdateInterval = setInterval(function(){
		//console.log(locations[index][0], locations[index][1]);
		turret.goToCoordinate(locations[index][0], locations[index][1]);
		index++;
		index = index >= locations.length ? 0 :index;
	}, frequency);
	//#
	setTimeout(function() {
        turret.goToPercentage(0, 0);
        gpioServer.end();
        clearInterval(servoUpdateInterval);
        clearInterval(timerInterval);
        console.log("ALL DONE!");
	    }, totalRunTime);

    socketApp.servos = {
        x : servoX,
        z : servoZ
    };

}


require(__dirname+'/lib/gpio_server.js')(onGPIOConnectListener);

