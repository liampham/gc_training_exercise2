interface IElectricBoard {
    
    removeElectricComponent(ec: IElectricComponent): void;


    setDisplayComponentNameState(displayState: ESwitch): void;
    getDisplayComponentNameState(): ESwitch;

    getPowerState(): ESwitch;
    setPowerState(powerState: ESwitch): void;

    getGridCellSize(): Size;

    setGridRow(gridRow: number): void;
    setGridColumn(gridColumn: number): void;

    setBackgroundColor(color: string): void;
    changeBackgroundColor(): void;

    getElectricComponents(): Array<IElectricComponent>;
    pluggedInNewComponent(electricComponent : IElectricComponent) : void;
    render(): void;


}