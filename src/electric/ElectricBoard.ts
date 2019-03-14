class ElectricBoard implements IElectricBoard, IObjectBase {
    protected boardElementID: string = "";
    private powerState: ESwitch = ESwitch.ON;
    private displayComponentNameState: ESwitch = ESwitch.ON;
    private gridRow: number = 6;
    private gridColumn: number = 6;
    private backgroundColor: string = "white";
    private electricComponents: Array<IElectricComponent> = [];
    private gridCellSize: Size = new Size();

    private view: HTMLElement;

    constructor(boardElementID: string) {
        this.boardElementID = boardElementID;
        this.view = document.getElementById(boardElementID);
    }

    initialize(properties: object): void {
        if (!properties) return;
        if (ParamsKey._POWER_STATE_ in properties) { this.powerState = properties[ParamsKey._POWER_STATE_] == 1 ? ESwitch.ON : ESwitch.OFF; }
        if (ParamsKey._DISPLAY_COMPONENT_NAME_ in properties) { this.displayComponentNameState = properties[ParamsKey._DISPLAY_COMPONENT_NAME_] == 1 ? ESwitch.ON : ESwitch.OFF; }
        if (ParamsKey._GRID_ROW_ in properties) { this.gridRow = properties[ParamsKey._GRID_ROW_]; }
        if (ParamsKey._GRID_COLUMN_ in properties) { this.gridColumn = properties[ParamsKey._GRID_COLUMN_]; }
        if (ParamsKey._BACKGROUND_COLOR_ in properties) { this.backgroundColor = properties[ParamsKey._BACKGROUND_COLOR_]; }
        this.drawGrid();
        if (ParamsKey._ELECTRIC_COMPONENTS_ in properties) {
            let componentDatas = properties[ParamsKey._ELECTRIC_COMPONENTS_];
            if (componentDatas) {
                for (let componentProperties of componentDatas) {
                    let electricComponent: IElectricComponent = new ElectricComponent();
                    electricComponent.initialize(componentProperties);
                    this.plugInComponent(electricComponent);
                }
            }
        }
    }
    isDisplayingComponentName(): boolean {
        return this.displayComponentNameState == ESwitch.ON;
    }
    displayComponentNameOn(): void {
        this.displayComponentNameState = ESwitch.ON;
        for (let ec of this.electricComponents) {
            ec.displayComponentName(this.isDisplayingComponentName() ? true : false);
        }
    }
    displayComponentNameOff(): void {
        this.displayComponentNameState = ESwitch.OFF;
        for (let ec of this.electricComponents) {
            ec.displayComponentName(this.isDisplayingComponentName() ? true : false);
        }
    }
    isPowerOn(): boolean {
        return this.powerState == ESwitch.ON;
    }
    powerOn(): void {
        this.powerState = ESwitch.ON;
        for (let ec of this.electricComponents) {
            ec.powerOn();
        }
    }
    powerOff(): void {
        this.powerState = ESwitch.OFF;
        for (let ec of this.electricComponents) {
            ec.powerOff();
        }
    }
    getGridCellSize(): Size {
        return this.gridCellSize;
    }
    setGridRow(gridRow: number): void {
        this.gridRow = gridRow;
        this.drawGrid();
        for (let ec of this.electricComponents) ec.updateSizeAndLocation();
    }
    setGridColumn(gridColumn: number): void {
        this.gridColumn = gridColumn;
        this.drawGrid();
        for (let ec of this.electricComponents) ec.updateSizeAndLocation();
    }
    getGridColumn(): number {
        return this.gridColumn;
    }
    getGridRow(): number {
        return this.gridRow;
    }
    setBackgroundColor(color: string): void {
        this.backgroundColor = color;
        let svgEles = this.getView().getElementsByClassName("board-grid");
        if (svgEles && svgEles.length > 0) {
            (<HTMLElement>svgEles[0]).style.backgroundColor = this.getBackgroundColor();
        }
    }
    getBackgroundColor(): string {
        return this.backgroundColor;
    }
    getElectricComponents(): IElectricComponent[] {
        return this.electricComponents;
    }
    getElectricComponentAtLocation(col: number, row: number): IElectricComponent {
        return this.electricComponents.find(ec => {
            return col == ec.getColumn() && row == ec.getRow();
        });
    }
    plugInComponent(ec: IElectricComponent): void {
        this.electricComponents.push(ec);
        ec.pluggedIn(this);
        this.addSubView(ec);
    }
    unPlugInComponent(ec: IElectricComponent): void {
        let index: number = this.electricComponents.indexOf(ec);
        if (index == -1) return;

        this.electricComponents[index].unPluggedIn();
        this.electricComponents.splice(index, 1);
    }
    getView(): HTMLElement {
        if (this.view == null) this.view = document.createElement("div");
        return this.view;
    }
    setView(view: HTMLElement) {
        this.view = view;
    }
    addSubView(view: IView): void {
        this.view.appendChild(view.getView());
    }
    removeSubView(view: IView) {
        this.view.removeChild(view.getView());
    }
    private drawGrid(): void {
        let grids = this.getView().getElementsByClassName("board-grid");
        for (let i = 0; i < grids.length; i++) {
            grids.item(i).remove();
        }

        let width: number = this.getView().clientWidth;
        let height: number = this.getView().clientHeight;

        this.getGridCellSize().set(Math.floor(width / this.getGridColumn()), Math.floor(height / this.getGridRow()));
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.style.backgroundColor = this.getBackgroundColor();
        svg.classList.add("a1-container-absolute");
        svg.classList.add("board-grid");

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

        this.getView().insertBefore(svg, this.getView().firstChild);

    }

}