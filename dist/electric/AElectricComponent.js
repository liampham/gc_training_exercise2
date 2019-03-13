var AElectricComponent = /** @class */ (function () {
    function AElectricComponent() {
        this.name = "";
        this.position = new Point();
        this.foreColor = "black";
        this.pluggedInState = ESwitch.ON;
        this.state = 1;
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
    AElectricComponent.prototype.setPluggedInState = function (pluggedInState) { this.pluggedInState = pluggedInState; };
    AElectricComponent.prototype.getPluggedInState = function () { return this.pluggedInState; };
    AElectricComponent.prototype.setState = function (state) { this.state = state; };
    AElectricComponent.prototype.getState = function () { return this.state; };
    AElectricComponent.prototype.setOnImage = function (image) { this.onImage = image; };
    AElectricComponent.prototype.getOnImage = function () { return this.onImage; };
    AElectricComponent.prototype.setOffImage = function (image) { this.offImage = image; };
    AElectricComponent.prototype.getOffImage = function () { return this.offImage; };
    AElectricComponent.prototype.getCustomRender = function () {
        return this.customRender;
    };
    AElectricComponent.prototype.setCustomRender = function (renderStr) {
        this.customRender = renderStr;
    };
    //Override
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
        this.renderDisplayComponentName(board);
        this.renderComponentImage(board.getPowerState());
    };
    /**Detect what image should show based on component status and board power state */
    AElectricComponent.prototype.renderComponentImage = function (boardPluggedInState) {
        if (this.customRender) {
            var imageEles_1 = this.getView().getElementsByClassName("component_image");
            if (imageEles_1.length > 0) {
                imageEles_1[0].style.visibility = "hidden";
            }
            var customRenders = this.getView().getElementsByClassName("custom_render");
            if (customRenders.length > 0) {
                customRenders[0].innerHTML = this.customRender;
            }
            return;
        }
        var imgSrc = this.getOffImage();
        if (this.getPluggedInState() == ESwitch.ON && boardPluggedInState == ESwitch.ON) {
            imgSrc = this.getOnImage();
        }
        var imageEles = this.getView().getElementsByClassName("component_image");
        if (imageEles && imageEles.length > 0) {
            if (imgSrc && imgSrc.length > 0) {
                imageEles[0].style.visibility = "visible";
                imageEles[0].src = imgSrc;
            }
            else {
                imageEles[0].remove();
            }
        }
    };
    /**Render component name based on board configuration. */
    AElectricComponent.prototype.renderDisplayComponentName = function (board) {
        var nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
            nameEles[0].style.color = this.getForeColor();
            nameEles[0].style.visibility = board.getDisplayComponentNameState() == ESwitch.ON ? "visible" : "hidden";
        }
    };
    //Override
    AElectricComponent.prototype.initialize = function (properties) {
        if (!properties)
            return;
        if (ParamsKey._NAME_ in properties) {
            this.setName(properties[ParamsKey._NAME_]);
        }
        if (ParamsKey._POSITION_ in properties) {
            var pos = properties[ParamsKey._POSITION_];
            if (pos) {
                if (ParamsKey._X_ in pos)
                    this.getPosition().setX(pos[ParamsKey._X_]);
                if (ParamsKey._Y_ in pos)
                    this.getPosition().setY(pos[ParamsKey._Y_]);
            }
        }
        if (ParamsKey._FORE_COLOR_ in properties) {
            this.setForeColor(properties[ParamsKey._FORE_COLOR_]);
        }
        if (ParamsKey._PLUGGED_IN_STATE_ in properties) {
            this.setPluggedInState(properties[ParamsKey._PLUGGED_IN_STATE_] == 1 ? ESwitch.ON : ESwitch.OFF);
        }
        if (ParamsKey._STATE_ in properties) {
            this.setState(properties[ParamsKey._STATE_]);
        }
        if (ParamsKey._ON_IMAGE_ in properties) {
            this.setOnImage(properties[ParamsKey._ON_IMAGE_]);
        }
        if (ParamsKey._OFF_IMAGE_ in properties) {
            this.setOffImage(properties[ParamsKey._OFF_IMAGE_]);
        }
        if (ParamsKey._CUSTOME_RENDER_ in properties) {
            this.customRender = properties[ParamsKey._CUSTOME_RENDER_];
        }
    };
    //Override
    AElectricComponent.prototype.turnOn = function () {
    };
    //Override
    AElectricComponent.prototype.turnOff = function () {
    };
    //Override
    AElectricComponent.prototype.onBoardPowerStateChanged = function (boardPluggedInState) {
        this.renderComponentImage(boardPluggedInState);
    };
    //Override
    AElectricComponent.prototype.changeComponentName = function (name) {
        this.setName(name);
        var nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
        }
    };
    //Override
    AElectricComponent.prototype.changeComponentForeColor = function (color) {
        this.setForeColor(color);
        var nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].style.color = this.getForeColor();
        }
    };
    //Override
    AElectricComponent.prototype.changePluggedInState = function (state, boardPowerState) {
        this.setPluggedInState(state == 1 ? ESwitch.ON : ESwitch.OFF);
        this.onBoardPowerStateChanged(boardPowerState);
    };
    //Override
    AElectricComponent.prototype.displayComponentName = function (display) {
        var nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
            nameEles[0].style.color = this.getForeColor();
            nameEles[0].style.visibility = display ? "visible" : "hidden";
        }
    };
    //Override
    AElectricComponent.prototype.getView = function () {
        if (this.view == null || this.view == undefined) {
            this.view = document.createElement("div");
        }
        return this.view;
    };
    //Override
    AElectricComponent.prototype.setView = function (view) {
        this.view = view;
    };
    return AElectricComponent;
}());
