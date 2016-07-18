
function Socket($rootScope){
    this.$rootScope = $rootScope;
    this.socket = io.connect();
    this.on = function (eventName, callback) {
            var self = this;
            self.socket.on(eventName, function () {
                var args = arguments;
                self.$rootScope.$apply(function () {
                    callback.apply(self.socket, args);
                });
            });
        };
    this.emit = function (eventName, data, callback) {
        var self = this;
        self.socket.emit(eventName, data, function () {
            var args = arguments;
            self.$rootScope.$apply(function () {
                if (callback) {
                    callback.apply(self.socket, args);
                }
            });
        });
    };
};