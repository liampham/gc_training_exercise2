var Log = /** @class */ (function () {
    function Log() {
    }
    Log.setEnable = function (enable) {
        this.enable = enable;
    };
    Log.isEnable = function () {
        return this.enable;
    };
    Log.m = function (provider, message) {
        if (!this.isEnable())
            return;
        console.log(provider, message);
    };
    Log.d = function (str) {
        if (!this.isEnable())
            return;
        console.log("Debug: ", str);
    };
    Log.e = function (str) {
        if (!this.isEnable())
            return;
        console.log("Error: ", str);
    };
    Log.w = function (str) {
        if (!this.isEnable())
            return;
        console.log("Warning: ", str);
    };
    Log.o = function (object) {
        if (!this.isEnable())
            return;
        console.log(object);
    };
    Log.enable = true;
    return Log;
}());
