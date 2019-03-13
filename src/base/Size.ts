class Size {

    public width: number = 1;

    public height: number = 1;

    constructor() {

    }

    public setWidth(width: number): void { this.width = width; }
    public getWidth(): number { return this.width; }

    public setHeight(height: number): void { this.height = height; }
    public getHeight(): number { return this.height; }

    public set(width : number, height : number): void{
        this.width = width;
        this.height = height;
    }


}