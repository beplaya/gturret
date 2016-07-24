"use strict";

app.controller('socketController', ['$scope','$rootScope', 'socket',
                    function($scope, $rootScope, socket) {
    $scope.socket = socket;
    $scope.streamUrl = 'images/loadinggif.gif';

    socket.on('disconnect', function (data) {
        $scope.connected = false;
    });

    socket.on('connected', function (data) {
        console.log('connected!!', data);
        $scope.mySocketId = data.socketId;
        $scope.connected = true;
        $scope.version = data.version;
    });

    socket.on('liveStream', function (url) {
        $scope.streamUrl = url;
    });

    $scope.endGPIO = function(){
        socket.emit('web_endGPIO', {}, function(){});
    }

//    socket.on('?', function (response) {
//        socket.emit('?', {}, function (result) {});
//    });

}]);
