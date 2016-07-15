module.exports = function(){
    var A = {};

    A.min = 1000;
    A.max = 2000;
    A.rangeMagnitude = 1000;

    A.restrictions = {
        angle : {
            min : 45,
            max : 135
        }
    };

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
        p = A.restrict(p);
        return A.min + (A.rangeMagnitude * p);
    };

    A.getValueForAngle = function(angle) {
        angle = Math.abs(angle);
        if(angle > 180){
            angle = angle % 180;
        }
        var percentage = A.restrict(angle/180);
        return A.getValueForPercentage(percentage);
    };

    A.restrict = function(percentage) {
        var minP = (restrictions.angle.min/180);
        var maxP = (restrictions.angle.max/180);
        percentage = percentage<minP ? minP : percentage;
        percentage = percentage>maxP ? maxP : percentage;
        return percentage;
    };

    return A;
}