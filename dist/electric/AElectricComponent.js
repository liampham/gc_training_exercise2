var AElectricComponent = /** @class */ (function () {
    function AElectricComponent() {
        this.name = "";
        this.position = new Point();
        this.foreColor = "black";
        this.switchState = ESwitch.ON;
        this.state = 0;
        this.onImage = "";
        this.offImage = "";
        this.customRender = "";
    }
    AElectricComponent.prototype.setName = function (name) { this.name = name; };
    AElectricComponent.prototype.getName = function () { return this.name; };
    AElectricComponent.prototype.setPosition = function (location) { this.position = location; };
    AElectricComponent.prototype.getPosition = function () { return this.position; };
    AElectricComponent.prototype.setForeColor = function (color) { this.foreColor = color; };
    AElectricComponent.prototype.getForeColor = function () { return this.foreColor; };
    AElectricComponent.prototype.setSwitchState = function (switchState) { this.switchState = switchState; };
    AElectricComponent.prototype.getSwitchState = function () { return this.switchState; };
    AElectricComponent.prototype.setState = function (state) { this.state = state; };
    AElectricComponent.prototype.getState = function () { return this.state; };
    AElectricComponent.prototype.setOnImage = function (image) { this.onImage = image; };
    AElectricComponent.prototype.getOnImage = function () { return this.onImage; };
    AElectricComponent.prototype.setOffImage = function (image) { this.offImage = image; };
    AElectricComponent.prototype.getOffImage = function () { return this.offImage; };
    AElectricComponent.prototype.setConfig = function (config) {
        if (!config)
            return;
        if (ParamsKey._NAME_ in config) {
            this.setName(config[ParamsKey._NAME_]);
        }
        if (ParamsKey._POSITION_ in config) {
            var pos = config[ParamsKey._POSITION_];
            if (pos) {
                if (ParamsKey._X_ in pos)
                    this.getPosition().setX(pos[ParamsKey._X_]);
                if (ParamsKey._Y_ in pos)
                    this.getPosition().setY(pos[ParamsKey._Y_]);
            }
        }
        if (ParamsKey._FORE_COLOR_ in config) {
            this.setForeColor(config[ParamsKey._FORE_COLOR_]);
        }
        if (ParamsKey._SWITCH_STATE_ in config) {
            this.setSwitchState(config[ParamsKey._SWITCH_STATE_] == 1 ? ESwitch.ON : ESwitch.OFF);
        }
        if (ParamsKey._STATE_ in config) {
            this.setState(config[ParamsKey._STATE_]);
        }
        if (ParamsKey._ON_IMAGE_ in config) {
            this.setOnImage(config[ParamsKey._ON_IMAGE_]);
        }
        if (ParamsKey._OFF_IMAGE_ in config) {
            this.setOffImage(config[ParamsKey._OFF_IMAGE_]);
        }
    };
    AElectricComponent.prototype.getView = function () {
        if (this.view == null || this.view == undefined) {
            this.view = document.createElement("div");
        }
        return this.view;
    };
    AElectricComponent.prototype.render = function (board) {
        if (this.customRender && this.customRender.length > 0) { }
        var view = this.getView();
        view.style.position = "absolute";
        view.style.left = this.getPosition().getX() + "px";
        view.style.top = this.getPosition().getY() + "px";
        view.style.width = board.getGridCellSize().getWidth() + "px";
        view.style.height = board.getGridCellSize().getHeight() + "px";
        view.style.overflow = "hidden";
        var renderTemplate = "<div class=\"a1-container\"><img src=\"\" class=\"a1-width-60 a1-content-center component_image\"><div class=\"custom_render\"></div> <div class=\"a1-absolute a1-left a1-top component_name\"></div></div>";
        view.innerHTML = renderTemplate;
        var nameEles = view.getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
            nameEles[0].style.color = this.getForeColor();
            nameEles[0].style.visibility = board.getDisplayComponentName() == ESwitch.ON ? "visible" : "hidden";
        }
        var imgSrc = this.getOffImage();
        if (this.getSwitchState() == ESwitch.ON && board.getPowerSwitchState() == ESwitch.ON) {
            imgSrc = this.getOnImage();
        }
        var imageEles = view.getElementsByClassName("component_image");
        if (imageEles && imageEles.length > 0) {
            if (imgSrc && imgSrc.length > 0) {
                imageEles[0].src = imgSrc;
            }
            else {
                imageEles[0].remove();
            }
        }
    };
    return AElectricComponent;
}());
