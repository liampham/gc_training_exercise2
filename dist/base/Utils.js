var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.isEmptyString = function (str) {
        return (!str || 0 === str.length);
    };
    Utils.clamp = function (val, min, max) {
        if (val < min)
            return min;
        else if (val > max)
            return max;
        else
            return val;
    };
    return Utils;
}());
