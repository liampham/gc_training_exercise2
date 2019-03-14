interface IElectricBoard extends IView {

    /**
     * true : Board is displaying component's name
     */
    isDisplayingComponentName(): boolean;

    /**
     * Show components name.
     */
    displayComponentNameOn(): void;

    /**
     * Hidden components name.
     */
    displayComponentNameOff(): void;

    /**
     * Ask to know whether the board power is on or not.
     */
    isPowerOn(): boolean;

    /**
     * Power on the board
     */
    powerOn(): void;

    /**
     * Power on the board
     */
    powerOff(): void;

    /**
     * Get dimmension of 1 cell in Board's Grid.
     */
    getGridCellSize(): Size;

    /**
     * set number row of Board's Grid 
     */
    setGridRow(gridRow: number): void;

    /**
     * set number column of Board's Grid 
     */
    setGridColumn(gridColumn: number): void;

    /**
     * get number row of Board's Grid 
     */
    getGridColumn(): number;

    /**
     * get number row of Board's Grid 
     */
    getGridRow(): number;

    /**
     * set background color of Board's Grid 
     */
    setBackgroundColor(color: string): void;
   
    /**
     * Get background color of Board's Grid
     */
    getBackgroundColor(): string;

    /**
    * get list Electric Components of the board.
    */
    getElectricComponents(): Array<IElectricComponent>;

    /**
    * find an electric component at specific location, return null if not.
    * @param row : row in grid
    * @param colum : column in grid
    */
    getElectricComponentAtLocation(col: number, row: number): IElectricComponent;

    /**
     * Attact new component to the board.
     * @param electricComponent : Component to add
     */
    plugInComponent(electricComponent: IElectricComponent): void;
    /**
    * Un plugin a component from board.
    * @param electricComponent : Component to remove.
    */
    unPlugInComponent(electricComponent: IElectricComponent): void;

}