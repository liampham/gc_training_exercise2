abstract class AElectricComponent {

    protected view: HTMLElement;

    protected name: string = "";
    protected position: Point = new Point();
    protected foreColor: string = "black";
    protected switchState: ESwitch = ESwitch.ON;
    protected state: number = 0;
    protected onImage: string = "";
    protected offImage: string = "";
    protected customRender: string = "";


    public setName(name: string): void { this.name = name; }
    public getName(): string { return this.name; }

    public setPosition(location: Point): void { this.position = location; }
    public getPosition(): Point { return this.position; }

    public setForeColor(color: string): void { this.foreColor = color; }
    public getForeColor(): string { return this.foreColor; }

    public setSwitchState(switchState: ESwitch): void { this.switchState = switchState; }
    public getSwitchState(): ESwitch { return this.switchState; }

    public setState(state: number): void { this.state = state; }
    public getState(): number { return this.state; }

    public setOnImage(image: string): void { this.onImage = image; }
    public getOnImage(): string { return this.onImage; }

    public setOffImage(image: string): void { this.offImage = image; }
    public getOffImage(): string { return this.offImage; }


    public setConfig(config: object): void {
        if (!config) return;

        if (ParamsKey._NAME_ in config) { this.setName(config[ParamsKey._NAME_]); }

        if (ParamsKey._POSITION_ in config) {
            let pos = config[ParamsKey._POSITION_];
            if (pos) {
                if (ParamsKey._X_ in pos) this.getPosition().setX(pos[ParamsKey._X_]);
                if (ParamsKey._Y_ in pos) this.getPosition().setY(pos[ParamsKey._Y_]);
            }
        }

        if (ParamsKey._FORE_COLOR_ in config) { this.setForeColor(config[ParamsKey._FORE_COLOR_]); }
        if (ParamsKey._SWITCH_STATE_ in config) { this.setSwitchState(config[ParamsKey._SWITCH_STATE_] == 1 ? ESwitch.ON : ESwitch.OFF); }
        if (ParamsKey._STATE_ in config) { this.setState(config[ParamsKey._STATE_]); }
        if (ParamsKey._ON_IMAGE_ in config) { this.setOnImage(config[ParamsKey._ON_IMAGE_]); }
        if (ParamsKey._OFF_IMAGE_ in config) { this.setOffImage(config[ParamsKey._OFF_IMAGE_]); }
    }

    public getView(): HTMLElement {
        if (this.view == null || this.view == undefined) {
            this.view = document.createElement("div");
        }
        return this.view;
    }

    public render(board: ElectricBoard): void {
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
        let nameEles = view.getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
            (<HTMLElement>nameEles[0]).style.color = this.getForeColor();
            (<HTMLElement>nameEles[0]).style.visibility = board.getDisplayComponentName() == ESwitch.ON ? "visible" : "hidden";
        }

        var imgSrc = this.getOffImage();

        if (this.getSwitchState() == ESwitch.ON && board.getPowerSwitchState() == ESwitch.ON) {
            imgSrc = this.getOnImage();
        }

        let imageEles = view.getElementsByClassName("component_image");
        if (imageEles && imageEles.length > 0) {
            if (imgSrc && imgSrc.length > 0) {
                (<HTMLImageElement>imageEles[0]).src = imgSrc;
            } else {
                imageEles[0].remove();
            }
        }

    }
}