module.exports = GCamera;
function GCamera(){
    if (!(this instanceof GCamera)) return new GCamera;
    //
    this.proc;
    this.filePath = __dirname + '/../../public/stream/image_stream.jpg';
    this.fs = require('fs');

    this.start = function(io) {
        var self = this;
        if(this.streaming) return;
        //
        this.streaming = false;
        //
        console.log("Starting camera...");

        var spawn = require('child_process').spawn;
        var args = ["-w", "640", "-h", "480", "-o", this.filePath, "-t", "999999999", "-tl", "100"];
        console.log('');
        console.log('raspistill', args.join(" "));
        console.log('');
        this.proc = spawn('raspistill', args);
//        this.fs.watchFile(this.filePath, function(current, previous) {
//            self.fs.readFile(self.filePath, function(err, buf){
//                if(err) {
//                    console.log(err);
//                }
//                if(!buf){
//                    console.log("Error: buffer empty!");
//                } else {
//                    console.log("  >><< ");
//                    io.sockets.emit('liveStream', { image: true, buffer: buf.toString('base64') });
//                }
//            });
//        });
        this.streamInterval = setInterval(function(){
            self.fs.readFile(self.filePath, function(err, buf){
                if(err) {
                    console.log(err);
                }
                if(!buf){
                    console.log("Error: buffer empty!");
                } else {
                    console.log("  >><< ");
                    io.sockets.emit('liveStream', { image: true, buffer: buf.toString('base64') });
                }
            });
        }, 3000);
    }

    this.stop = function() {
        this.streaming = false;
        if (this.proc) {
            this.proc.kill();
        }
        this.fs.unwatchFile(this.filePath);
    }
}