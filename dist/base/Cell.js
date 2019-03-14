var Cell = /** @class */ (function () {
    function Cell() {
        this.row = -1;
        this.col = -1;
    }
    Cell.prototype.setRow = function (row) { this.row = row; };
    Cell.prototype.getRow = function () { return this.row; };
    Cell.prototype.setColumn = function (col) { this.col = col; };
    Cell.prototype.getColumn = function () { return this.col; };
    Cell.prototype.set = function (row, col) { this.row = row; this.col = col; };
    return Cell;
}());
