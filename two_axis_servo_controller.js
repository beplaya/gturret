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
        screen : {
            width : 0,
            height : 0,
            distance : 0
        }
    };

    C.goToPercentage = function(xAxisPercentage, zAxisPercentage){
        C.servoControllers.x.goToPercentage(xAxisPercentage);
        C.servoControllers.z.goToPercentage(zAxisPercentage);
    };

    C.goToCoordinate = function(x, y){
        var xap = C.getXAxisPercentageForYCoord(y);
        var zap = C.getZAxisPercentageForXCoord(x);
        console.log(x, zap, y, xap);
        C.servoControllers.x.goToPercentage(xap);
        C.servoControllers.z.goToPercentage(zap);
    };

    C.getZAxisPercentageForXCoord = function(x) {
        x = x > C.screen.width ? C.screen.width : x;
        x = x < 0 ? 0 : x;
        return 100 * x / C.screen.width;
    };

    C.getXAxisPercentageForYCoord = function(y) {
        y = y > C.screen.height ? C.screen.height : y;
        y = y < 0 ? 0 : y;
        return 100 * y / C.screen.height;
    };

    C.setScreenDistanceCM = function(distance, cmWidth, cmHeight) {
        console.log("_____________________");
        C.screen.width = cmWidth;
        C.screen.height = cmHeight;
        var a,b,c, angle;
        //
        a = distance;
        b = C.screen.width/2;
        c = Math.sqrt((a*a) + (b*b));
        angle = 180 * Math.acos(distance / c)/Math.PI;
        C.angles.z.min = 90 - angle;
        C.angles.z.max = 180 - C.angles.z.min;
        //
        a = distance;
        b = C.screen.height/2;
        c = Math.sqrt((a*a) + (b*b));
        angle = 180 * Math.acos(distance / c)/Math.PI;
        C.angles.x.min = 90 - angle;
        C.angles.x.max = 180 - C.angles.x.min;

        console.dir(C.angles);
        console.log("_____________________");
    };

    console.log("@#@");
    C.setScreenDistanceCM(10, 10, 10);
    console.log("@#@");
    return C;
}