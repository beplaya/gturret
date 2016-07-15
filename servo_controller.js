module.exports = function(gpioServer, pin, name){
    var S = { name : name || "?"};
    S.angler = require(__dirname + "/servo_angler.js")();
    S.angler.setRange(600, 2500);
    S.gpioServer = gpioServer;
    S.pin = pin;

    S.setAngleRestrictions = function(min, max) {
        min = Math.abs(min) || 0;
        max = Math.abs(max) || 0;
        min = min*1;
        max = max*1;
        min = min>179 ? 0 : min;
        max = max>180 ? 180 : max;
        max = max==min ? min+1 : max;
        if(max < min) {
            var m = min;
            min = max;
            max = m;
        }
        S.angler.restrictions.angle.min = min;
        S.angler.restrictions.angle.max = max;
    };

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