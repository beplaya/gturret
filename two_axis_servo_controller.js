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

    C.log = function(){
        console.log(C.servoControllers.x.pw, C.servoControllers.z.pw);
    };

    C.goToPercentage = function(xAxisPercentage, zAxisPercentage){
        C.servoControllers.x.goToPercentage(xAxisPercentage);
        C.servoControllers.z.goToPercentage(zAxisPercentage);
    };

    C.goToCoordinate = function(x, y){
        console.log("---");
        var xa = C.getAxisAngleForCoord(y, C.screen.height, C.angles.x);
        var za = C.getAxisAngleForCoord(x, C.screen.width, C.angles.z);
        console.log(x, "->", za, y, "->", xa);
        C.servoControllers.x.goToAngle(xa);
        C.servoControllers.z.goToAngle(za);
        console.log("---");
    };

    C.getAxisAngleForCoord = function(V, maxCoord, angleValues) {
        var angleRange = angleValues.max - angleValues.min;

        V = V > maxCoord ? maxCoord : V;
        V = V < 0 ? 0 : V;

        var ratioOfMaxCoord = V / maxCoord;
        var angle = angleValues.min + (angleRange * ratioOfMaxCoord);

        return angle;
    };

    C.getXAxisPercentageForYCoord = function(y) {
        y = y > C.screen.height ? C.screen.height : y;
        y = y < 0 ? 0 : y;
        return 100 * y / C.screen.height;
    };

    C.setScreenDistanceCM = function(distance, cmWidth, cmHeight) {
        //console.log("_____________________");
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

        //console.dir(C.angles);
        //console.log("_____________________");
    };

    C.setScreenDistanceCM(1, 1, 1);
    return C;
}