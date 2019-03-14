interface IElectricComponent extends IObjectBase, IView {

    /**
     * Get custom string to render instead of component's images. it can be string, htmlString.
     */
    getCustomRender(): string;

    /**
     * set custom string to render instead of component's images. 
     * @param renderStr : string or htmlString represent component's UI. if renderStr is empty, component will render using its image properties.
     */

    setCustomRender(renderStr: string): void;

    /**
     * Get name of component
     */
    getName(): string;
    /**
     * Set component name.
     * @param name string
     */
    setName(name: string): void;

    /**
     * Get image to display component when it light on.
     */
    getOnImage(): string;

    /**
    * Set image to display component when it light on.
    * @param image : url of the image, it can be locale url or remote url.
    */
    setOnImage(image: string): void;

    /**
   * Get image to display component when it light off.
   */
    getOffImage(): string;

    /**
    * Set image to display component when it light off.
    * @param image : url of the image, it can be locale url or remote url.
    */
    setOffImage(image: string): void;

    /**
    * get which column in the board's grid that component located. 
    */
    getColumn(): number;

    /**
     * get which row in the board's grid that component located.
     */
    getRow(): number;

    /**
     * set column of the component
     * @param col : number
     */
    setColumn(col: number): void;
    /**
     * set row of the component
     * @param col : number
     */
    setRow(row: number): void

    /**
     * Get color of the text display component's name
     */
    getForeColor(): string;

    /**
     * set color of the text display component's name
     * @param color : string or hex.
     */
    setForeColor(color: string): void;

    /**
     * Get light state of this component.
     * @returns true if the light is turn on, false if not.
     */
    isTurnedOn(): boolean;
    /**
     * Turn on the light.
     */
    turnOn(): void;
    /**
     * Turn off the light.
     */
    turnOff(): void;

    /**
     * Using when component is unplugged in from the board. component view is automatic removed from the board itself.
     */
    unPluggedIn();

    /**
     * call this funtion when component unplugged in from the board. 
     * component view is automatic removed from the board itself.
     */
    pluggedIn(board: IElectricBoard);

    /**
     * Relocated component based on Board's properties.
     */
    updateSizeAndLocation(): void;

    powerOn(): void;
    powerOff(): void;

    displayComponentName(display: boolean): void;



}