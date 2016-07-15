module.exports = function(servoX, servoZ) {
    var C = {
        angles : {
            x : {
                    min : 45,
                    max : 135
                },
            z : {
                    min : 45,
                    max : 135
            }
        },
        servoControllers : {
            x:servoX, z:servoZ
        },
        screen {
            width : 0,
            height : 0,
            distance : 0
        }
    };

    C.servoControllers.x.setAngleRestrictions(C.angles.x.min, C.angles.x.max);
    C.servoControllers.z.setAngleRestrictions(C.angles.z.min, C.angles.z.max);

    C.goToPercentage = function(xAxisPercentage, zAxisPercentage){
        C.servoControllers.x.goToPercentage(xAxisPercentage);
        C.servoControllers.z.goToPercentage(zAxisPercentage);
    };

    C.goToCoordinate = function(x, y){
        C.servoControllers.x.goToPercentage(C.getXAxisPercentageForYCoord(y));
        C.servoControllers.z.goToPercentage(C.getZAxisPercentageForXCoord(x));
    };

    C.getZAxisPercentageForXCoord = function(x) {
        x = x > C.screen.width ? C.screen.width : x;
        x = x < 0 ? 0 : x;
        return 100 * x / C.screen.width;
    };

    C.getXAxisPercentageForYCoord = function(y) {
        y = y > C.screen.height ? C.screen.height : y;
        y = y < 0 ? 0 : y;
        return 100 - (100 * y / C.screen.height);
    };

    C.setScreenDistanceCM = function(distance) {
        C.screen.width = distance * Math.sin(C.angles.z.min);
        C.screen.width += distance * Math.sin(C.angles.z.max-90);
        C.screen.height = distance * Math.sin(C.angles.x.min);
        C.screen.height += distance * Math.sin(C.angles.x.max-90);
    };

    C.setScreenDistanceCM(10);

    return C;
}