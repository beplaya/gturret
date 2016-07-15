module.exports = function(servoZ, servoX) {
    var C = {
        servoControllers : {
                x:servoX, z:servoZ
            },
        screen {
            width : 0,
            height : 0,
            distance : 0
        }
    };

    C.goToPercentage = function(zAxisPercentage, yAxisPercentage){
        C.servoControllers.z.goToPercentage(zAxisPercentage);
        C.servoControllers.y.goToPercentage(yAxisPercentage);
    };

    C.goToCoordinate = function(x, y){
        C.servoControllers.z.goToPercentage(C.getZAxisPercentageForXCoord(x));
        C.servoControllers.y.goToPercentage(C.getYAxisPercentageForYCoord(Y));
    };

    C.getZAxisPercentageForXCoord = function(x) {

    };

    C.getYAxisPercentageForYCoord = function(y) {

    };

    C.setScreenDistanceCM = function(distance) {

    };

    C.setScreenDistance(10);

    return C;
}