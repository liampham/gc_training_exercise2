class ElectricBoard {

    public boardElementID: string = "";
    public powerSwitchState: ESwitch = ESwitch.ON;
    public displayComponentName: ESwitch = ESwitch.ON;
    public gridRow: number = 6;
    public gridColumn: number = 6;
    public backgroundColor: string = "white";
    public electricComponents: Array<AElectricComponent> = [];
    public gridCellSize: Size = new Size();

    constructor(boardElementID: string) {
        this.boardElementID = boardElementID;
    }

    public setConfig(config: object) {
        if (!config) return;
        if (ParamsKey._POWER_SWITCH_STATE_ in config) { this.setPowerSwitchState(config[ParamsKey._POWER_SWITCH_STATE_] == 1 ? ESwitch.ON : ESwitch.OFF); }
        if (ParamsKey._DISPLAY_COMPONENT_NAME_ in config) { this.setDisplayComponentName(config[ParamsKey._DISPLAY_COMPONENT_NAME_] == 1 ? ESwitch.ON : ESwitch.OFF); }
        if (ParamsKey._GRID_ROW_ in config) { this.setGridRow(config[ParamsKey._GRID_ROW_]); }
        if (ParamsKey._GRID_COLUMN_ in config) { this.setGridColumn(config[ParamsKey._GRID_COLUMN_]); }
        if (ParamsKey._BACKGROUND_COLOR_ in config) { this.setBackgroundColor(config[ParamsKey._BACKGROUND_COLOR_]); }
        if (ParamsKey._ELECTRIC_COMPONENTS_ in config) {
            let componentDatas = config[ParamsKey._ELECTRIC_COMPONENTS_];
            if (componentDatas) {
                for (let data of componentDatas) {
                    let electricComponent: AElectricComponent = new CommonElectricComponent();
                    electricComponent.setConfig(data);
                    this.addElectricComponent(electricComponent);
                }
            }
        }
    }

    public setGridRow(gridRow: number): void {
        this.gridRow = gridRow;
    }
    public setGridColumn(gridColumn: number): void {
        this.gridColumn = gridColumn;
    }

    public getGridRow(): number {
        return this.gridRow;
    }
    public getGridColumn(): number {
        return this.gridColumn;
    }
    public setBackgroundColor(backgroundColor: string): void {
        this.backgroundColor = backgroundColor;
    }

    public getBackgroundColor(): string {
        return this.backgroundColor;
    }
    public setDisplayComponentName(displayComponent: ESwitch): void {
        this.displayComponentName = displayComponent;
    }
    public getDisplayComponentName(): ESwitch {
        return this.displayComponentName;
    }
    public setPowerSwitchState(powerState: ESwitch) {
        this.powerSwitchState = powerState;
    }
    public getPowerSwitchState(): ESwitch {
        return this.powerSwitchState;
    }

    public getGridCellSize(): Size {
        return this.gridCellSize;
    }
    public setGridCellSize(size: Size): void {
        this.gridCellSize = size;
    }

    public addElectricComponent(component: AElectricComponent, ignoreWhenCellIsFilled: boolean = true): void {
        if (!ignoreWhenCellIsFilled) {
            let found = this.electricComponents.find(ec => {
                return ec.getPosition().getX() == component.getPosition().getX() && ec.getPosition().getY() == component.getPosition().getY();
            });
            if (found) return;
        }
        this.electricComponents.push(component);
    }

    public removeElectricComponent(component: AElectricComponent): void {
        let index: number = this.electricComponents.indexOf(component);
        if (index != -1) {
            this.electricComponents.splice(index, 1);
        }
    }

    public getElectricComponents(): Array<AElectricComponent> {
        return this.electricComponents;
    }


    public render(): void {
        if (!this.boardElementID || this.boardElementID.length == 0) return;

        let container = document.getElementById(this.boardElementID);
        if (!container) return;

        container.innerHTML = "";

        this.getGridCellSize().setWidth(Math.floor(container.clientWidth / this.getGridColumn()));
        this.getGridCellSize().setHeight(Math.floor(container.clientHeight / this.getGridRow()));

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

}