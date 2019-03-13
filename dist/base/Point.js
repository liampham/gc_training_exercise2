var Point = /** @class */ (function () {
    function Point() {
        this.x = -1;
        this.y = -1;
    }
    Point.prototype.setX = function (x) { this.x = x; };
    Point.prototype.getX = function () { return this.x; };
    Point.prototype.setY = function (y) { this.y = y; };
    Point.prototype.getY = function () { return this.y; };
    Point.prototype.set = function (x, y) { this.x = x; this.y = y; };
    return Point;
}());
