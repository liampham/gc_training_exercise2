var ElectricComponent = /** @class */ (function () {
    function ElectricComponent() {
        this.name = "";
        this.row = -1;
        this.column = -1;
        this.foreColor = "black";
        this.lightState = ESwitch.ON;
        this.onImage = "";
        this.offImage = "";
        this.customRender = "";
    }
    //Override
    ElectricComponent.prototype.getView = function () {
        if (this.view == null || this.view == undefined) {
            this.view = document.createElement("div");
            this.view.style.position = "absolute";
            this.view.style.overflow = "hidden";
            this.view.innerHTML = "<div class=\"a1-container\"><img src=\"\" class=\"a1-content-center component_image\" style=\"max-height:80%; max-width:60%\"><div class=\"custom_render\"></div> <div class=\"a1-absolute a1-left a1-top component_name\" style=\"font-size:0.8em\"></div></div>";
        }
        return this.view;
    };
    //Override
    ElectricComponent.prototype.setView = function (view) {
        this.view = view;
    };
    ElectricComponent.prototype.addSubView = function (view) {
        this.view.appendChild(view.getView());
    };
    ElectricComponent.prototype.removeSubView = function (view) {
        this.view.removeChild(view.getView());
    };
    ElectricComponent.prototype.getElectricBoard = function () { return this.board; };
    ElectricComponent.prototype.setName = function (name) {
        this.name = name;
        var nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
        }
    };
    ElectricComponent.prototype.getName = function () { return this.name; };
    ElectricComponent.prototype.getColumn = function () {
        return this.column;
    };
    ElectricComponent.prototype.getRow = function () {
        return this.row;
    };
    ElectricComponent.prototype.setColumn = function (col) {
        this.column = col;
        this.updateSizeAndLocation();
    };
    ElectricComponent.prototype.setRow = function (row) {
        this.row = row;
        this.updateSizeAndLocation();
    };
    ElectricComponent.prototype.setForeColor = function (color) {
        this.foreColor = color;
        var nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].style.color = this.getForeColor();
        }
    };
    ElectricComponent.prototype.getForeColor = function () {
        return this.foreColor;
    };
    ElectricComponent.prototype.powerOn = function () {
        var imageEles = this.getView().getElementsByClassName("component_image");
        if (imageEles && imageEles.length > 0) {
            imageEles[0].src = this.getOnImage();
        }
    };
    ElectricComponent.prototype.powerOff = function () {
        var imageEles = this.getView().getElementsByClassName("component_image");
        if (imageEles && imageEles.length > 0) {
            imageEles[0].src = this.getOffImage();
        }
    };
    ElectricComponent.prototype.isTurnedOn = function () {
        return this.lightState == ESwitch.ON;
    };
    ;
    ElectricComponent.prototype.turnOn = function () {
        this.lightState = ESwitch.ON;
        this.updateComponentUI();
    };
    ElectricComponent.prototype.turnOff = function () {
        this.lightState = ESwitch.OFF;
        this.updateComponentUI();
    };
    ElectricComponent.prototype.setOnImage = function (image) {
        this.onImage = image;
    };
    ElectricComponent.prototype.getOnImage = function () {
        return this.onImage;
    };
    ElectricComponent.prototype.setOffImage = function (image) {
        this.offImage = image;
    };
    ElectricComponent.prototype.getOffImage = function () {
        return this.offImage;
    };
    ElectricComponent.prototype.getCustomRender = function () {
        return this.customRender;
    };
    ElectricComponent.prototype.setCustomRender = function (renderStr) {
        this.customRender = renderStr;
        this.updateComponentUI();
    };
    /**Detect what image should show based on component status and board power state */
    ElectricComponent.prototype.updateComponentUI = function () {
        if (!this.getElectricBoard())
            return;
        if (this.customRender) {
            var imageEles_1 = this.getView().getElementsByClassName("component_image");
            if (imageEles_1.length > 0) {
                imageEles_1[0].style.visibility = "hidden";
            }
            var customRenders_1 = this.getView().getElementsByClassName("custom_render");
            if (customRenders_1.length > 0) {
                customRenders_1[0].innerHTML = this.customRender;
            }
            return;
        }
        var customRenders = this.getView().getElementsByClassName("custom_render");
        if (customRenders.length > 0) {
            customRenders[0].innerHTML = "";
        }
        var imgSrc = this.getOffImage();
        if (this.isTurnedOn() && this.getElectricBoard().isPowerOn()) {
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
    ElectricComponent.prototype.updateComponentName = function () {
        if (!this.getElectricBoard())
            return;
        var nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
            nameEles[0].style.color = this.getForeColor();
            nameEles[0].style.visibility = this.getElectricBoard().isDisplayingComponentName() ? "visible" : "hidden";
        }
    };
    //Override
    ElectricComponent.prototype.initialize = function (properties) {
        if (!properties)
            return;
        if (ParamsKey._NAME_ in properties) {
            this.setName(properties[ParamsKey._NAME_]);
        }
        if (ParamsKey._COLUMN_ in properties) {
            this.setColumn(properties[ParamsKey._COLUMN_]);
        }
        if (ParamsKey._ROW_ in properties) {
            this.setRow(properties[ParamsKey._ROW_]);
        }
        if (ParamsKey._FORE_COLOR_ in properties) {
            this.setForeColor(properties[ParamsKey._FORE_COLOR_]);
        }
        if (ParamsKey._TURN_ON_ in properties) {
            this.lightState = properties[ParamsKey._TURN_ON_] == 1 ? ESwitch.ON : ESwitch.OFF;
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
    ElectricComponent.prototype.displayComponentName = function (display) {
        var nameEles = this.getView().getElementsByClassName("component_name");
        if (nameEles && nameEles.length > 0) {
            nameEles[0].innerHTML = this.getName();
            nameEles[0].style.color = this.getForeColor();
            nameEles[0].style.visibility = display ? "visible" : "hidden";
        }
    };
    ElectricComponent.prototype.pluggedIn = function (board) {
        this.board = board;
        this.updateSizeAndLocation();
        this.updateComponentName();
        this.updateComponentUI();
    };
    ElectricComponent.prototype.unPluggedIn = function () {
        this.getElectricBoard().removeSubView(this);
    };
    ElectricComponent.prototype.updateSizeAndLocation = function () {
        if (!this.board)
            return;
        this.getView().style.left = this.getElectricBoard().getGridCellSize().width * this.getColumn() + "px";
        this.getView().style.top = this.getElectricBoard().getGridCellSize().height * this.getRow() + "px";
        this.getView().style.width = this.getElectricBoard().getGridCellSize().getWidth() + "px";
        this.getView().style.height = this.getElectricBoard().getGridCellSize().getHeight() + "px";
    };
    return ElectricComponent;
}());
