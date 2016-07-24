var args = process.argv.slice(2);
var distanceToScreenCM =  50;
var doCamera = args[0] ? true : false;
var screenDimsCM = { x: 10, y: 10};
var socketApp = require(__dirname+"/gpio_web_server/web_server.js")(doCamera);
socketApp.turret = {mock:true, setCenter:function(){}, setMode:function(){}};
var onGPIOConnectListener = function(gpioServer) {
    console.log("@@");
    if(socketApp)
        console.log('socketApp is alive')
    else
        console.log('socketApp dne')

	var servoX = require(__dirname+"/lib/servo_controller.js")(gpioServer, 17, "x-axis");
	var servoZ = require(__dirname+"/lib/servo_controller.js")(gpioServer, 18, "z-axis");

	var turret = require(__dirname+"/lib/turret.js")(servoX, servoZ);
    socketApp.turret = turret;
	turret.setScreenDistanceCM(distanceToScreenCM,
			screenDimsCM.x, screenDimsCM.y);

	var frequency = 200;
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

    var totalRunTime = 4 * (locations.length)*frequency;
    var runTime = 0;
    var timerIntervalFrequency = 1000;
    var timerInterval = setInterval(function(){
                runTime += timerIntervalFrequency;
                console.log('Run time (s):', runTime/1000, ' Time left (s):', (totalRunTime-runTime)/1000);
                turret.log();
            }, timerIntervalFrequency);
	setTimeout(function() {
        turret.goToPercentage(0, 0);
        gpioServer.end();
        //clearInterval(servoUpdateInterval);
        clearInterval(timerInterval);
        console.log("ALL DONE!");
	    }, totalRunTime);

    socketApp.endGPIO = function(){
        console.log('endGPIO');
        gpioServer.end();
    };

    socketApp.servos = {
        x : servoX,
        z : servoZ
    };

}


require(__dirname+'/lib/gpio_server.js')(onGPIOConnectListener);

