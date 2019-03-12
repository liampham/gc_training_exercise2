var Size = /** @class */ (function () {
    function Size() {
        this.width = 1;
        this.height = 1;
    }
    Size.prototype.setWidth = function (width) { this.width = width; };
    Size.prototype.getWidth = function () { return this.width; };
    Size.prototype.setHeight = function (height) { this.height = height; };
    Size.prototype.getHeight = function () { return this.height; };
    return Size;
}());
