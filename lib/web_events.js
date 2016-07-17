module.exports = function(app, io, socket){
    //Events from web page
    socket.on('disconnect', function() {
        console.log('Disconnected!');
        var i = app.sockets.indexOf(socket);
        app.sockets.splice(i, 1);
    });
//    socket.on('???', function(data) {
//        io.emitter.emit("???", {socketId:socketId});
//    });
}