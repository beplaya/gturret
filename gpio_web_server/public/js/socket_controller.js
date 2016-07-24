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

    socket.on('liveStream', function (data) {
        var ctx = document.getElementById('streamCanvas').getContext('2d');
        if (data.image) {
            var img = new Image();
            img.src = 'data:image/jpeg;base64,' + data.buffer;
            ctx.drawImage(img, 0, 0);
        }
    });

    $scope.endGPIO = function(){
        socket.emit('web_endGPIO', {}, function(){});
    }

//    socket.on('?', function (response) {
//        socket.emit('?', {}, function (result) {});
//    });

    var ctx = document.getElementById('streamCanvas').getContext('2d');
    var img = new Image();
    img.src = 'images/loadinggif.gif';
    ctx.drawImage(img, 0, 0);
}]);
