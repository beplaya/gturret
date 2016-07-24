module.exports = function(doCamera) {
    console.log("@");
    var express = require('express');
    var app = express();
    var fs = require('fs');
    app.version = require(__dirname + '/lib/version').version;
    console.log("@", app.version);

    var port = 8088;
    app.use(express.static(__dirname + '/public'));
    app.get('/test', function(req, res){
        res.send('working');
    });
    var server = require('http').createServer(app);
    //
    var io = require('socket.io').listen(server);

    //~~~
    require(__dirname + "/lib/socket_manager")(app, io);
    require(__dirname + "/lib/emitter")(app, io);

    //~~~


    server.listen(port);
    console.log("@ listening on port" + port);
    if(doCamera) {
        var gcamera = require(__dirname + '/lib/camera/gcamera.js')();
        gcamera.start(io);

        setTimeout(function(){
            gcamera.stop();
        }, 10000)
    }
    return app;
};