class Point {

    public x: number = -1;

    public y: number = -1;

    constructor() {

    }

    public setX(x: number): void { this.x = x; }
    public getX(): number { return this.x; }

    public setY(y: number): void { this.y = y; }
    public getY(): number { return this.y; }

    public set(x: number, y: number): void { this.x = x; this.y = y; }

}