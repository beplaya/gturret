module.exports = function(app, io) {
    app.sockets = [];
    io.sockets.on('connection', function (socket) {
        console.log('Connection established:', socket.id);
        var found = false;
        for(var i=0; i<app.sockets.length; i++) {
            if(app.sockets[i].id == socket.id){
                app.sockets[i] = socket;
                found = true;
                break;
            }
        }
        if(!found) {
            app.sockets.push(socket);
        }

        // sending a message back to the client
        socket.emit('connected', {
                                version : app.version,
                                socketId : socket.id});

        //setup events
        require(__dirname + "/web_events")(app, io, socket);

        socket.lastCheckSum = 0;
        setTimeout(io.heartBeat, 1000);
    });
}