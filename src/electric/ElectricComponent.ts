class ElectricComponent implements IElectricComponent {
    private view: HTMLElement;
    private name: string = "";
    private row: number = -1;
    private column: number = -1;
    private foreColor: string = "black";
    private lightState: ESwitch = ESwitch.ON;
    private onImage: string = "";
    private offImage: string = "";
    private customRender: string = "";
    private board: IElectricBoard;

    constructor() { }

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
    getView(): HTMLElement {
        if (this.view == null || this.view == undefined) {
            this.view = document.createElement("div");
            this.view.style.position = "absolute";
            this.view.style.overflow = "hidden";
            this.view.innerHTML = "<div class=\"a1-container\"><img src=\"\" class=\"a1-content-center component_image\" style=\"max-height:80%; max-width:60%\"><div class=\"custom_render\"></div> <div class=\"a1-absolute a1-left a1-top component_name\" style=\"font-size:0.8em\"></div></div>";
        }
        return this.view;
    }
    setView(view: HTMLElement): void {
        this.view = view;
    }
    addSubView(view: IView): void {
        this.view.appendChild(view.getView());
    }
    removeSubView(view: IView) {
        this.view.removeChild(view.getView());
    }
    getCustomRender(): string {
        return this.customRender;
    }
    setCustomRender(renderStr: string): void {
        this.customRender = renderStr;
        this.updateComponentUI();
    }
    getName(): string {
        return this.name;
    }
    setName(name: string): void {
        this.name = name;
        let nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
        }
    }
    setOnImage(image: string): void {
        this.onImage = image;
    }
    getOnImage(): string {
        return this.onImage;
    }
    setOffImage(image: string): void {
        this.offImage = image;
    }
    getOffImage(): string {
        return this.offImage;
    }
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
    getForeColor(): string {
        return this.foreColor;
    }
    setForeColor(color: string): void {
        this.foreColor = color;
        let nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            (<HTMLElement>nameEles[0]).style.color = this.getForeColor();
        }
    }
    isTurnedOn(): boolean {
        return this.lightState == ESwitch.ON;
    }
    turnOn(): void {
        this.lightState = ESwitch.ON;
        this.updateComponentUI();
    }
    turnOff(): void {
        this.lightState = ESwitch.OFF;
        this.updateComponentUI();
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
    updateSizeAndLocation(): void {
        if (!this.board) return;
        this.getView().style.left = this.getElectricBoard().getGridCellSize().width * this.getColumn() + "px";
        this.getView().style.top = this.getElectricBoard().getGridCellSize().height * this.getRow() + "px";
        this.getView().style.width = `${this.getElectricBoard().getGridCellSize().getWidth()}px`;
        this.getView().style.height = `${this.getElectricBoard().getGridCellSize().getHeight()}px`;
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
    showComponentName(display: boolean): void {
        let nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
            (<HTMLElement>nameEles[0]).style.color = this.getForeColor();
            (<HTMLElement>nameEles[0]).style.visibility = display ? "visible" : "hidden";
        }
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
            (<HTMLElement>nameEles[0]).style.visibility = this.getElectricBoard().isShowingComponentName() ? "visible" : "hidden";
        }
    }
    private getElectricBoard(): IElectricBoard {
        return this.board;
    }
}