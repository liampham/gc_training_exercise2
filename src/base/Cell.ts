class Cell {
    public row: number = -1;
    public col: number = -1;

    constructor() {

    }

    public setRow(row: number): void { this.row = row; }
    public getRow(): number { return this.row; }

    public setColumn(col: number): void { this.col = col; }
    public getColumn(): number { return this.col; }

    public set(row: number, col: number): void { this.row = row; this.col = col; }

}