module.exports = function(cb){
	var GPIO_SERVER = {};
	var PiFastGpio = require('pi-fast-gpio-master');
	GPIO_SERVER.args = process.argv.slice(2);

	GPIO_SERVER.HOST = '127.0.0.1';
	GPIO_SERVER.PORT = 8888;


	GPIO_SERVER.change = 1;
	GPIO_SERVER.min = 500;
	GPIO_SERVER.pw = 0; // pulsewidth in microseconds
	GPIO_SERVER.max = 2500;
	GPIO_SERVER.gpio = new PiFastGpio();
	GPIO_SERVER.applyPulseWidth = function(pw, servoController) {
		GPIO_SERVER.gpio.setServoPulsewidth(servoController.pin, pw); // servo off
	};
	//GPIO_SERVER.gpio.setServoPulsewidth(SERVO_1_GPIO, 0); // servo off
	GPIO_SERVER.end = function() {
		GPIO_SERVER.gpio.close();
	};
	GPIO_SERVER.gpio.connect(GPIO_SERVER.HOST, GPIO_SERVER.PORT, function(err) {
		cb(GPIO_SERVER);
	});
}
