var PiFastGpio = require('pi-fast-gpio-master');
var args = process.argv.slice(2);
var SERVO_1_GPIO = args[0] || 18;
if(!SERVO_1_GPIO) {
	console.log("No pin arg provided!")
	return;
}

//var SERVO_2_GPIO = 23;
var HOST = '127.0.0.1';
var PORT = 8888;
var run = true;

var change = 1;
var min = 500;
var pw = 0; // pulsewidth in microseconds
var max = 2500;
var gpio = new PiFastGpio();

var angle = require("./angle.js")();
angle.setRange(650, 2500);

var aaa = 0;
pw = angle.getValueForPercentage(0);
//
var angles = [0, 45, 90, 135, 180, 135, 90, 45,0];
//
var index = 0;
gpio.connect(HOST, PORT, function(err) {
  if (err) throw err;

  console.log("connected!");
  setTimeout(function() { run = false; }, 15000);
  
  console.log("go!");
  var servoUpdateInterval = setInterval(function() {
    gpio.setServoPulsewidth(SERVO_1_GPIO, pw);

    
	/*percentage++;
	if(percentage > 100){
		percentage = 0;
	}*/
	aaa = angles[index];
	pw = angle.getValueForAngle(aaa);
	

    // These values are chosen to be safe for most servos.
    // Your particular servo might be able to go further.
    //if (pw < 1150 || pw > 1850) {
	
	index++;
	index = index >= angles.length ? 0 : index;
	console.log(pw, change, aaa);
    if (!run) {
      gpio.setServoPulsewidth(SERVO_1_GPIO, 0); // servo off
      gpio.close();
      clearInterval(servoUpdateInterval);
    }
  }, 500);
});

