module.exports = function(app, io, socket){
    socket.on('disconnect', function() {
        console.log('Disconnected!');
        var i = app.sockets.indexOf(socket);
        app.sockets.splice(i, 1);
    });
    socket.on('web_endGPIO', function(data) {
        app.endGPIO();
    });
    socket.on('web_gotoPercent', function(data) {
        if(app.servos && data.axis){
            var servo = app.servos[data.axis];
            if(!servo) console.log('no servo for axis:', data.axis, '!');
            if(servo) {
                console.log('   -->web_gotoPercent', data.axis, data.percent);
                servo.goToPercentage(data.percent*1);
            }
        } else {
            console.log('web_gotoPercent ERROR', data);
        }
    });
}