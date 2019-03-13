abstract class AElectricComponent implements IElectricComponent {
 


    protected view: HTMLElement;

    protected name: string = "";
    protected position: Point = new Point();
    protected foreColor: string = "black";
    protected pluggedInState: ESwitch = ESwitch.ON;
    protected state: number = 1;
    protected onImage: string = "";
    protected offImage: string = "";
    protected customRender: string = "";


    public setName(name: string): void { this.name = name; }
    public getName(): string { return this.name; }

    public setPosition(location: Point): void { this.position = location; }
    public getPosition(): Point { return this.position; }

    public setForeColor(color: string): void { this.foreColor = color; }
    public getForeColor(): string { return this.foreColor; }

    public setPluggedInState(pluggedInState: ESwitch): void { this.pluggedInState = pluggedInState; }
    public getPluggedInState(): ESwitch { return this.pluggedInState; }

    public setState(state: number): void { this.state = state; }
    public getState(): number { return this.state; }

    public setOnImage(image: string): void { this.onImage = image; }
    public getOnImage(): string { return this.onImage; }

    public setOffImage(image: string): void { this.offImage = image; }
    public getOffImage(): string { return this.offImage; }

    getCustomRender(): string {
        return this.customRender;
    }
    setCustomRender(renderStr: string): void {
        this.customRender = renderStr;
    }



    //Override
    public render(board: IElectricBoard): void {
        if (this.customRender && this.customRender.length > 0) { }

        let view: HTMLElement = this.getView();
        view.style.position = "absolute";
        view.style.left = `${this.getPosition().getX()}px`;
        view.style.top = `${this.getPosition().getY()}px`;
        view.style.width = `${board.getGridCellSize().getWidth()}px`;
        view.style.height = `${board.getGridCellSize().getHeight()}px`;
        view.style.overflow = "hidden";
        let renderTemplate: string = "<div class=\"a1-container\"><img src=\"\" class=\"a1-width-60 a1-content-center component_image\"><div class=\"custom_render\"></div> <div class=\"a1-absolute a1-left a1-top component_name\"></div></div>";
        view.innerHTML = renderTemplate;

        this.renderDisplayComponentName(board);

        this.renderComponentImage(board.getPowerState());

    }

    /**Detect what image should show based on component status and board power state */
    private renderComponentImage(boardPluggedInState: ESwitch): void {
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



        var imgSrc = this.getOffImage();

        if (this.getPluggedInState() == ESwitch.ON && boardPluggedInState == ESwitch.ON) {
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
    private renderDisplayComponentName(board: IElectricBoard): void {
        let nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
            (<HTMLElement>nameEles[0]).style.color = this.getForeColor();
            (<HTMLElement>nameEles[0]).style.visibility = board.getDisplayComponentNameState() == ESwitch.ON ? "visible" : "hidden";
        }
    }

    //Override
    initialize(properties: object): void {
        if (!properties) return;

        if (ParamsKey._NAME_ in properties) { this.setName(properties[ParamsKey._NAME_]); }

        if (ParamsKey._POSITION_ in properties) {
            let pos = properties[ParamsKey._POSITION_];
            if (pos) {
                if (ParamsKey._X_ in pos) this.getPosition().setX(pos[ParamsKey._X_]);
                if (ParamsKey._Y_ in pos) this.getPosition().setY(pos[ParamsKey._Y_]);
            }
        }
        if (ParamsKey._FORE_COLOR_ in properties) { this.setForeColor(properties[ParamsKey._FORE_COLOR_]); }
        if (ParamsKey._PLUGGED_IN_STATE_ in properties) { this.setPluggedInState(properties[ParamsKey._PLUGGED_IN_STATE_] == 1 ? ESwitch.ON : ESwitch.OFF); }
        if (ParamsKey._STATE_ in properties) { this.setState(properties[ParamsKey._STATE_]); }
        if (ParamsKey._ON_IMAGE_ in properties) { this.setOnImage(properties[ParamsKey._ON_IMAGE_]); }
        if (ParamsKey._OFF_IMAGE_ in properties) { this.setOffImage(properties[ParamsKey._OFF_IMAGE_]); }
        if (ParamsKey._CUSTOME_RENDER_ in properties) { this.customRender = properties[ParamsKey._CUSTOME_RENDER_]; }
    }

    //Override
    turnOn(): void {

    }
    //Override
    turnOff(): void {

    }

    //Override
    onBoardPowerStateChanged(boardPluggedInState: ESwitch): void {
        this.renderComponentImage(boardPluggedInState);
    }

    //Override
    changeComponentName(name: string): void {
        this.setName(name);
        let nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
        }
    }
    //Override
    changeComponentForeColor(color: string) {
        this.setForeColor(color);
        let nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            (<HTMLElement>nameEles[0]).style.color = this.getForeColor();
        }
    }
    //Override
    changePluggedInState(state: number, boardPowerState: ESwitch): void {
        this.setPluggedInState(state == 1 ? ESwitch.ON : ESwitch.OFF);
        this.onBoardPowerStateChanged(boardPowerState);
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

    //Override
    getView(): HTMLElement {
        if (this.view == null || this.view == undefined) {
            this.view = document.createElement("div");
        }
        return this.view;
    }
    //Override
    setView(view: HTMLElement): void {
        this.view = view;
    }
}