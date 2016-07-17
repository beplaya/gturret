module.exports = function(){
    var A = {};

    A.min = 1000;
    A.max = 2000;
    A.rangeMagnitude = 1000;

    A.setRange = function(min, max) {
        min = min || 0;
        max = max || 0;
        max = max==min ? min+1 : max;
        if(max < min) {
            var m = min;
            min = max;
            max = m;
        }
        A.min = min*1;
        A.max = max*1;
        A.rangeMagnitude = A.max - A.min;
    };

    A.getValueForPercentage = function(percentage) {
        var p = Math.abs(percentage/100);
        return A.min + (A.rangeMagnitude * p);
    };

    A.getValueForAngle = function(angle) {
        angle = Math.abs(angle);
        if(angle > 180){
            angle = angle % 180;
        }
        return A.getValueForPercentage(angle/180);
    };


    return A;
}