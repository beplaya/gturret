"use strict";

app.controller('socketController', ['$scope','$rootScope', 'socket',
                    function($scope, $rootScope, socket) {
    $scope.socket = socket;

    socket.on('disconnect', function (data) {
        $scope.connected = false;
    });

    socket.on('connected', function (data) {
        console.log('connected!!', data);
        $scope.mySocketId = data.socketId;
        $scope.connected = true;
        $scope.version = data.version;
    });

    $scope.endGPIO = function(){
        socket.emit('web_endGPIO', {}, function(){});
    }

//    socket.on('?', function (response) {
//        socket.emit('?', {}, function (result) {});
//    });

}]);
