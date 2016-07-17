module.exports = function(gpioServer, pin, name){
    var S = { name : name || "?"};
    S.angler = require(__dirname + "/servo_angler.js")();
    S.angler.setRange(600, 2500);
    S.gpioServer = gpioServer;
    S.pin = pin;

    S.goToPercentage = function(percentage) {
        var pw = S.angler.getValueForPercentage(percentage);
        S.gpioServer.applyPulseWidth(pw, S);
    };

    S.goToAngle = function(angle) {
        var pw = S.angler.getValueForAngle(angle);
        S.gpioServer.applyPulseWidth(pw, S);
    };

    return S;
}