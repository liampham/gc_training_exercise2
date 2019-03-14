class ElectricComponent implements IElectricComponent {

    protected view: HTMLElement;
    protected name: string = "";
    protected row: number = -1;
    protected column: number = -1;
    protected foreColor: string = "black";
    protected lightState: ESwitch = ESwitch.ON;
    protected onImage: string = "";
    protected offImage: string = "";
    protected customRender: string = "";

    protected board: IElectricBoard;

    constructor() {

    }

    //Override
    getView(): HTMLElement {
        if (this.view == null || this.view == undefined) {
            this.view = document.createElement("div");
            this.view.style.position = "absolute";
            this.view.style.overflow = "hidden";
            this.view.innerHTML = "<div class=\"a1-container\"><img src=\"\" class=\"a1-content-center component_image\" style=\"max-height:80%; max-width:60%\"><div class=\"custom_render\"></div> <div class=\"a1-absolute a1-left a1-top component_name\" style=\"font-size:0.8em\"></div></div>";
        }
        return this.view;
    }

    //Override
    setView(view: HTMLElement): void {
        this.view = view;
    }

    addSubView(view: IView): void {
        this.view.appendChild(view.getView());
    }

    removeSubView(view: IView) {
        this.view.removeChild(view.getView());
    }

    private getElectricBoard(): IElectricBoard { return this.board; }

    public setName(name: string): void {
        this.name = name;
        let nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
        }
    }

    public getName(): string { return this.name; }

    getColumn(): number {
        return this.column;
    }
    getRow(): number {
        return this.row;
    }
    setColumn(col: number): void {
        this.column = col;
        this.updateSizeAndLocation();
    }
    setRow(row: number): void {
        this.row = row;
        this.updateSizeAndLocation();
    }

    public setForeColor(color: string): void {
        this.foreColor = color;
        let nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            (<HTMLElement>nameEles[0]).style.color = this.getForeColor();
        }
    }
    public getForeColor(): string {
        return this.foreColor;
    }

    powerOn(): void {
        let imageEles = this.getView().getElementsByClassName("component_image");
        if (imageEles && imageEles.length > 0) {
            (<HTMLImageElement>imageEles[0]).src = this.getOnImage();
        }
    }

    powerOff(): void {
        let imageEles = this.getView().getElementsByClassName("component_image");
        if (imageEles && imageEles.length > 0) {
            (<HTMLImageElement>imageEles[0]).src = this.getOffImage();
        }
    }

    isTurnedOn(): boolean {
        return this.lightState == ESwitch.ON;
    };

    turnOn(): void {
        this.lightState = ESwitch.ON;
        this.updateComponentUI();
    }

    turnOff(): void {
        this.lightState = ESwitch.OFF;
        this.updateComponentUI();
    }

    public setOnImage(image: string): void {
        this.onImage = image;
    }
    public getOnImage(): string {
        return this.onImage;
    }

    public setOffImage(image: string): void {
        this.offImage = image;
    }
    public getOffImage(): string {
        return this.offImage;
    }

    getCustomRender(): string {
        return this.customRender;
    }

    setCustomRender(renderStr: string): void {
        this.customRender = renderStr;
        this.updateComponentUI();
    }

    /**Detect what image should show based on component status and board power state */
    private updateComponentUI(): void {
        if (!this.getElectricBoard()) return;
        if (this.customRender) {
            let imageEles = this.getView().getElementsByClassName("component_image");
            if (imageEles.length > 0) {
                (<HTMLImageElement>imageEles[0]).style.visibility = "hidden";
            }

            let customRenders = this.getView().getElementsByClassName("custom_render");
            if (customRenders.length > 0) {
                (<HTMLElement>customRenders[0]).innerHTML = this.customRender;
            }

            return;
        }

        let customRenders = this.getView().getElementsByClassName("custom_render");
        if (customRenders.length > 0) {
            (<HTMLElement>customRenders[0]).innerHTML = "";
        }

        var imgSrc = this.getOffImage();

        if (this.isTurnedOn() && this.getElectricBoard().isPowerOn()) {
            imgSrc = this.getOnImage();
        }

        let imageEles = this.getView().getElementsByClassName("component_image");
        if (imageEles && imageEles.length > 0) {
            if (imgSrc && imgSrc.length > 0) {
                (<HTMLImageElement>imageEles[0]).style.visibility = "visible";
                (<HTMLImageElement>imageEles[0]).src = imgSrc;
            } else {
                imageEles[0].remove();
            }
        }
    }

    /**Render component name based on board configuration. */
    private updateComponentName(): void {
        if (!this.getElectricBoard()) return;
        let nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
            (<HTMLElement>nameEles[0]).style.color = this.getForeColor();
            (<HTMLElement>nameEles[0]).style.visibility = this.getElectricBoard().isDisplayingComponentName() ? "visible" : "hidden";
        }
    }

    //Override
    initialize(properties: object): void {
        if (!properties) return;

        if (ParamsKey._NAME_ in properties) { this.setName(properties[ParamsKey._NAME_]); }

        if (ParamsKey._COLUMN_ in properties) {
            this.setColumn(properties[ParamsKey._COLUMN_]);
        }
        if (ParamsKey._ROW_ in properties) {
            this.setRow(properties[ParamsKey._ROW_]);
        }
        if (ParamsKey._FORE_COLOR_ in properties) { this.setForeColor(properties[ParamsKey._FORE_COLOR_]); }
        if (ParamsKey._TURN_ON_ in properties) { this.lightState = properties[ParamsKey._TURN_ON_] == 1 ? ESwitch.ON : ESwitch.OFF; }
        if (ParamsKey._ON_IMAGE_ in properties) { this.setOnImage(properties[ParamsKey._ON_IMAGE_]); }
        if (ParamsKey._OFF_IMAGE_ in properties) { this.setOffImage(properties[ParamsKey._OFF_IMAGE_]); }
        if (ParamsKey._CUSTOME_RENDER_ in properties) { this.customRender = properties[ParamsKey._CUSTOME_RENDER_]; }
    }

    //Override
    displayComponentName(display: boolean): void {
        let nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
            (<HTMLElement>nameEles[0]).style.color = this.getForeColor();
            (<HTMLElement>nameEles[0]).style.visibility = display ? "visible" : "hidden";
        }
    }

    pluggedIn(board: IElectricBoard) {
        this.board = board;
        this.updateSizeAndLocation();
        this.updateComponentName();
        this.updateComponentUI();
    }

    unPluggedIn() {
        this.getElectricBoard().removeSubView(this);
    }

    public updateSizeAndLocation() {
        if (!this.board) return;
        this.getView().style.left = this.getElectricBoard().getGridCellSize().width * this.getColumn() + "px";
        this.getView().style.top = this.getElectricBoard().getGridCellSize().height * this.getRow() + "px";
        this.getView().style.width = `${this.getElectricBoard().getGridCellSize().getWidth()}px`;
        this.getView().style.height = `${this.getElectricBoard().getGridCellSize().getHeight()}px`;
    }

}