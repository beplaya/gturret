module.exports = GCamera;
function GCamera(){
    if (!(this instanceof GCamera)) return new GCamera;
    //
    this.proc;
    this.filePath = __dirname + '/stream/image_stream.jpg';
    this.fs = require('fs');

    this.start = function(io) {
        if(this.streaming) return;
        //
        this.streaming = false;
        //
        console.log("Starting camera...");

        var fs = require('fs');
        var spawn = require('child_process').spawn;
        var args = ["-w", "640", "-h", "480", "-o", this.filePath, "-t", "999999999", "-tl", "100"];
        this.proc = spawn('raspistill', args);
//        this.fs.watchFile(this.filePath, function(current, previous) {
//            var url = 'image_stream.jpg?_t=' + (Math.random() * 100000);
//            console.log("  >>watchFile<< ", url);
//            io.sockets.emit('liveStream', url);
//        });
        setInterval(function(){
            var url = 'image_stream.jpg?_t=' + (Math.random() * 100000);
            console.log("  >>watchFile<< ", url);
            io.sockets.emit('liveStream', url);
        }, 500);
    }

    this.stop = function() {
        this.streaming = false;
        if (this.proc) {
            this.proc.kill();
        }
        this.fs.unwatchFile(this.filePath);
    }
}