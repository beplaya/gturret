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
        console.log('web_gotoPercent', data);

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
    socket.on('web_turret_setCenterPercent', function(data) {
        console.log('web_turret_setCenterPercent', data);
        if(app.turret && data.center){
            app.turret.setCenterPercent(data.center);
        } else {
            console.log('web_turret_setCenterPercent ERROR', data);
        }
    });
    socket.on('web_turret_setMode', function(data) {
        console.log('web_turret_setMode', data);

        if(app.turret && data.mode){
            app.turret.setMode(data.mode);
        } else {
            console.log('web_turret_setMode ERROR', data, app.turret);
        }
    });
}