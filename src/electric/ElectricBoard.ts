class ElectricBoard implements IElectricBoard, IObjectBase {


    public boardElementID: string = "";
    public powerState: ESwitch = ESwitch.ON;
    public displayComponentNameState: ESwitch = ESwitch.ON;
    public gridRow: number = 6;
    public gridColumn: number = 6;
    public backgroundColor: string = "white";
    public electricComponents: Array<IElectricComponent> = [];
    public gridCellSize: Size = new Size();

    constructor(boardElementID: string) {
        this.boardElementID = boardElementID;
    }

    public setGridRow(gridRow: number): void { this.gridRow = gridRow; }
    public setGridColumn(gridColumn: number): void { this.gridColumn = gridColumn; }

    public getGridRow(): number { return this.gridRow; }
    public getGridColumn(): number { return this.gridColumn; }

    public setBackgroundColor(backgroundColor: string): void { this.backgroundColor = backgroundColor; }
    public getBackgroundColor(): string { return this.backgroundColor; }

    public setDisplayComponentNameState(displayComponentState: ESwitch): void { this.displayComponentNameState = displayComponentState; }
    public getDisplayComponentNameState(): ESwitch { return this.displayComponentNameState; }

    public setPowerState(powerState: ESwitch) { this.powerState = powerState; }
    public getPowerState(): ESwitch { return this.powerState; }

    public setGridCellSize(size: Size): void { this.gridCellSize = size; }
    public getGridCellSize(): Size { return this.gridCellSize; }

    public addElectricComponent(component: IElectricComponent, ignoreWhenCellIsFilled: boolean = true): void {
        if (!ignoreWhenCellIsFilled) {
            let found = this.electricComponents.find(ec => {
                return ec.getPosition().getX() == component.getPosition().getX() && ec.getPosition().getY() == component.getPosition().getY();
            });
            if (found) return;
        }
        this.electricComponents.push(component);
    }

    public removeElectricComponent(component: IElectricComponent): void {
        let index: number = this.electricComponents.indexOf(component);
        if (index != -1) {
            this.electricComponents[index].getView().remove();
            this.electricComponents.splice(index, 1);
        }
    }

    public getElectricComponents(): Array<IElectricComponent> {
        return this.electricComponents;
    }


    public render(): void {
        if (!this.boardElementID || this.boardElementID.length == 0) return;

        let container = document.getElementById(this.boardElementID);
        if (!container) return;

        container.innerHTML = "";

        this.getGridCellSize().set(Math.floor(container.clientWidth / this.getGridColumn()), Math.floor(container.clientHeight / this.getGridRow()));

        this.drawGrid(container);

        for (let ec of this.electricComponents) {
            let view = ec.getView();
            ec.render(this);
            container.appendChild(view);
        }

    }

    private drawGrid(container: HTMLElement): void {
        if (!container) return;

        let width: number = container.clientWidth;
        let height: number = container.clientHeight;

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.style.width = `${width}px`;
        svg.style.height = `${height}px`;
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.position = "absolute";
        svg.style.backgroundColor = this.getBackgroundColor();

        for (let i = 0; i < this.gridRow; i++) {
            let line = <SVGLineElement>document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "0");
            line.setAttribute("y1", `${(i / this.gridRow) * height}`);
            line.setAttribute("x2", `${width}`);
            line.setAttribute("y2", `${(i / this.gridRow) * height}`);
            line.setAttribute("stroke-width", "0.5");
            line.setAttribute("stroke", "lightgray");
            svg.appendChild(line);
        }

        for (let i = 0; i < this.gridColumn; i++) {
            let line = <SVGLineElement>document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", `${(i / this.gridColumn) * width}`);
            line.setAttribute("y1", `0`);
            line.setAttribute("x2", `${(i / this.gridColumn) * width}`);
            line.setAttribute("y2", `${height}`);
            line.setAttribute("stroke-width", "0.5");
            line.setAttribute("stroke", "lightgray");
            svg.appendChild(line);
        }

        container.appendChild(svg);

    }




    //Override
    public initialize(properties: object): void {
        if (!properties) return;
        if (ParamsKey._POWER_STATE_ in properties) { this.setPowerState(properties[ParamsKey._POWER_STATE_] == 1 ? ESwitch.ON : ESwitch.OFF); }
        if (ParamsKey._DISPLAY_COMPONENT_NAME_ in properties) { this.setDisplayComponentNameState(properties[ParamsKey._DISPLAY_COMPONENT_NAME_] == 1 ? ESwitch.ON : ESwitch.OFF); }
        if (ParamsKey._GRID_ROW_ in properties) { this.setGridRow(properties[ParamsKey._GRID_ROW_]); }
        if (ParamsKey._GRID_COLUMN_ in properties) { this.setGridColumn(properties[ParamsKey._GRID_COLUMN_]); }
        if (ParamsKey._BACKGROUND_COLOR_ in properties) { this.setBackgroundColor(properties[ParamsKey._BACKGROUND_COLOR_]); }
        if (ParamsKey._ELECTRIC_COMPONENTS_ in properties) {
            let componentDatas = properties[ParamsKey._ELECTRIC_COMPONENTS_];
            if (componentDatas) {
                for (let componentProperties of componentDatas) {
                    let electricComponent: IElectricComponent = new CommonElectricComponent();
                    electricComponent.initialize(componentProperties);
                    this.addElectricComponent(electricComponent);
                }
            }
        }
    }

    changeBackgroundColor(): void {

        if (!this.boardElementID || this.boardElementID.length == 0) return;
        let container = document.getElementById(this.boardElementID);
        if (!container) return;

        let svgEles = container.getElementsByTagName("svg");
        if (svgEles && svgEles.length > 0) {
            svgEles[0].style.backgroundColor = this.getBackgroundColor();
        }
    }

    pluggedInNewComponent(electricComponent: IElectricComponent): void {
        this.addElectricComponent(electricComponent);
        if (!this.boardElementID || this.boardElementID.length == 0) return;

        let container = document.getElementById(this.boardElementID);
        if (!container) return;
        electricComponent.render(this);
        container.appendChild(electricComponent.getView());

    }
}