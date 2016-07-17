module.exports = function(gpioServer, pin, name){
    var S = { name : name || "?"};
    S.angler = require(__dirname + "/servo_angler.js")();
    S.angler.setRange(600, 2500);
    S.gpioServer = gpioServer;
    S.pin = pin;
    S.pw = 0;

    S.goToPercentage = function(percentage) {
        S.pw = S.angler.getValueForPercentage(percentage);
        S.gpioServer.applyPulseWidth(pw, S);
    };

    S.goToAngle = function(angle) {
        S.pw = S.angler.getValueForAngle(angle);
        //console.log(angle, "angle->pw", pw);
        S.gpioServer.applyPulseWidth(S.pw, S);
    };

    return S;
}