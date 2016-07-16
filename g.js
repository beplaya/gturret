var PiFastGpio = require('pi-fast-gpio-master');
var args = process.argv.slice(2);

var HOST = '127.0.0.1';
var PORT = 8888;
var run = true;


var gpio = new PiFastGpio();


var index = 0;
gpio.connect(HOST, PORT, function(err) {
  if (err) throw err;

  console.log("connected!");
  setTimeout(function() { run = false; }, 5000);
  
  console.log("go!");
  var servoUpdateInterval = setInterval(function() {
	  process.stdout.write('.');
    if (!run) {
      gpio.close();
      clearInterval(servoUpdateInterval);
    }
  }, 50);
});

