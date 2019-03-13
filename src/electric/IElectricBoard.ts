interface IElectricBoard {

    setDisplayComponentNameState(displayState: ESwitch): void;
    getDisplayComponentNameState(): ESwitch;

    getPowerState(): ESwitch;
    setPowerState(powerState: ESwitch): void;

    getGridCellSize(): Size;

    setGridRow(gridRow : number) : void;
    setGridColumn(gridColumn : number) : void;

    setBackgroundColor(color : string) : void;

    render() : void;
}