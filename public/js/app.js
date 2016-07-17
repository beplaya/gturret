"use strict";

var app = angular.module("angularapp", ["ngRoute"]);

app.run(['$rootScope', function($rootScope){
}]);

app.factory('socket', function ($rootScope) {
    return new Socket($rootScope);
});
//
//String.prototype.capitalizeFirstLetter = function() {
//    return this.charAt(0).toUpperCase() + this.slice(1);
//}
//
//function pad(num, size) {
//    var s = num+"";
//    while (s.length < size) s = "0" + s;
//    return s;
//}
//
//function getParameterByName(name) {
//    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//        results = regex.exec(location.search);
//    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
//}
//
//function formatDate(date, noMinutes){
//    var df = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
//
//    if(!noMinutes)
//        df += "  "+pad(date.getHours(), 2) + ":" + pad(date.getMinutes(), 2);
//    return df;
//}

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
