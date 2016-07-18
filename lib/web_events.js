module.exports = function(app, io, socket){
    //Events from web page
    socket.on('disconnect', function() {
        console.log('Disconnected!');
        var i = app.sockets.indexOf(socket);
        app.sockets.splice(i, 1);
    });
    socket.on('web_gotoPercent', function(data) {
        //io.emitter.emit("???", {socketId:socketId});
        if(app.socketApp && data.axis){
            var servo = socketApp.servos[data.axis];
            if(servo && (data.percent || data.percent === 0)) {
                console.log('web_gotoPercent', data.axis, data.percent);
                servo.goToPercentage(data.percent*1);
            }
        }
    });
//    socket.on('???', function(data) {
//        io.emitter.emit("???", {socketId:socketId});
//    });
}