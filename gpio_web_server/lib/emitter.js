module.exports = function(app, io) {
    io.emitter = {
        emit : function(name, data, socketId){
            //console.log("EMIT!!!", name, socketId||"broadcast filter on "+data.socketId);
            for(var i=0; i<app.sockets.length; i++){
                if(!socketId || socketId == app.sockets[i].id) {
                    try{
                        if(app.sockets[i].connected) {
                            app.sockets[i].emit(name, data);
                            //console.log("emit"+i);
                        }
                    } catch(e){
                        console.log(e);
                    }
                }
            }
        }
    };


    io.heartBeat = function(){
        var clients = [];
        for(var i=0; i<app.sockets.length; i++) {
            if(!app.sockets[i].hide){
                clients.push({
                        version : app.sockets[i].version,
                        socketId : app.sockets[i].id});
            }
        }
        io.emitter.emit("heartbeat", {clients : clients });
    };
    io.heartBeatInterval = setInterval(io.heartBeat, 20000);

}