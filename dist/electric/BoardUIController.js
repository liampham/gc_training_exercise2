var BoardUIController = /** @class */ (function () {
    function BoardUIController(board) {
        this.electricBoard = board;
        this.initializeInputHandlers();
        this.renderComponentsList();
    }
    BoardUIController.prototype.initializeInputHandlers = function () {
        var _this = this;
        var btnApplyBoardConfiguration = document.getElementById(R.BTN_APPLY_BOARD_CONFIGURATION);
        if (btnApplyBoardConfiguration) {
            btnApplyBoardConfiguration.onclick = function () {
                _this.updateBoardConfigurations();
            };
        }
        var btnCloseComponentDetailView = document.getElementById(R.BTN_CLOSE_COMPONENT_DETAIL);
        if (btnCloseComponentDetailView) {
            btnCloseComponentDetailView.onclick = function () {
                _this.showComponentDetail(false);
            };
        }
        var btnAddNewComponent = document.getElementById(R.BTN_ADD_COMPONENT);
        if (btnAddNewComponent) {
            btnAddNewComponent.onclick = function () {
                _this.onClickAddNewComponent();
            };
        }
        var inputBoardPowerSwitch = document.getElementById(R.INPUT_BOARD_POWER_SWITCH);
        if (inputBoardPowerSwitch) {
            inputBoardPowerSwitch.onchange = function () {
                _this.onPowerStateChanged();
            };
        }
        var inputDisplayComponentName = document.getElementById(R.INPUT_BOARD_DISPLAY_COMPONENT_NAME);
        if (inputDisplayComponentName) {
            inputDisplayComponentName.onchange = function () {
                _this.onDisplayComponentNameStateChanged();
            };
        }
        var inputBoardBackgroundColor = document.getElementById(R.INPUT_BOARD_BACKGROUND_COLOR);
        if (inputBoardBackgroundColor) {
            inputBoardBackgroundColor.onchange = function () {
                _this.onBoardBackgroundColorChanged();
            };
        }
    };
    BoardUIController.prototype.onBoardBackgroundColorChanged = function () {
        var backgroundColorElement = document.getElementById(R.INPUT_BOARD_BACKGROUND_COLOR);
        if (backgroundColorElement) {
            this.electricBoard.setBackgroundColor(backgroundColorElement.value);
            this.electricBoard.changeBackgroundColor();
        }
    };
    BoardUIController.prototype.onPowerStateChanged = function () {
        var powerSwitchElement = document.getElementById(R.INPUT_BOARD_POWER_SWITCH);
        if (powerSwitchElement) {
            this.electricBoard.setPowerState(powerSwitchElement.checked ? ESwitch.ON : ESwitch.OFF);
            for (var _i = 0, _a = this.electricBoard.getElectricComponents(); _i < _a.length; _i++) {
                var ec = _a[_i];
                ec.onBoardPowerStateChanged(this.electricBoard.getPowerState());
            }
        }
    };
    BoardUIController.prototype.onDisplayComponentNameStateChanged = function () {
        var displayComponentName = document.getElementById(R.INPUT_BOARD_DISPLAY_COMPONENT_NAME);
        if (displayComponentName) {
            this.electricBoard.setDisplayComponentNameState(displayComponentName.checked ? ESwitch.ON : ESwitch.OFF);
            for (var _i = 0, _a = this.electricBoard.getElectricComponents(); _i < _a.length; _i++) {
                var ec = _a[_i];
                ec.displayComponentName(displayComponentName.checked);
            }
        }
    };
    BoardUIController.prototype.onClickAddNewComponent = function () {
        var _this = this;
        this.currentComponent = new CommonElectricComponent();
        this.currentComponent.getPosition().set(240, 240);
        this.showComponentDetail(true);
        document.getElementById(R.COMPONENT_NAME).innerText = "Add new component";
        document.getElementById(R.BTN_SUBMIT_COMPONENT).style.visibility = "visible";
        document.getElementById(R.BTN_SUBMIT_COMPONENT).onclick = function () {
            if (Utils.isEmptyString(_this.currentComponent.getName()))
                return;
            _this.electricBoard.pluggedInNewComponent(_this.currentComponent);
            _this.showComponentDetail(false);
            _this.renderComponentsList();
        };
    };
    BoardUIController.prototype.showComponentDetail = function (show) {
        var _this = this;
        var listComponentContainer = document.getElementById(R.LIST_COMPONENTS_CONTAINER);
        if (listComponentContainer) {
            listComponentContainer.style.display = show ? "none" : "block";
        }
        var componentDetailContainer = document.getElementById(R.COMPONENT_DETAIL_CONTAINER);
        if (componentDetailContainer) {
            componentDetailContainer.style.display = show ? "block" : "none";
        }
        if (!this.currentComponent)
            return;
        document.getElementById(R.COMPONENT_NAME).innerText = "Component Detail";
        {
            var componentNameElement_1 = document.getElementById(R.INPUT_COMPONENT_NAME);
            componentNameElement_1.value = this.currentComponent.getName();
            componentNameElement_1.onchange = function () {
                _this.currentComponent.changeComponentName(componentNameElement_1.value);
            };
        }
        {
            var componentPowerStateElement_1 = document.getElementById(R.INPUT_COMPONENT_POWER_STATE);
            componentPowerStateElement_1.checked = this.currentComponent.getPluggedInState() == ESwitch.ON ? true : false;
            componentPowerStateElement_1.onchange = function () {
                _this.currentComponent.changePluggedInState(componentPowerStateElement_1.checked ? 1 : 0, _this.electricBoard.getPowerState());
            };
        }
        {
            var componentForeColorElement_1 = document.getElementById(R.INPUT_COMPONENT_FORECOLOR);
            componentForeColorElement_1.value = this.currentComponent.getForeColor();
            componentForeColorElement_1.onchange = function () {
                _this.currentComponent.changeComponentForeColor(componentForeColorElement_1.value);
            };
        }
        {
            var componentOnImageElement_1 = document.getElementById(R.INPUT_COMPONENT_ON_IMAGE);
            componentOnImageElement_1.value = this.currentComponent.getOnImage();
            componentOnImageElement_1.onchange = function () {
                _this.currentComponent.setOnImage(componentOnImageElement_1.value);
                _this.currentComponent.onBoardPowerStateChanged(_this.electricBoard.getPowerState());
            };
        }
        {
            var componentOffImageElement_1 = document.getElementById(R.INPUT_COMPONENT_OFF_IMAGE);
            componentOffImageElement_1.value = this.currentComponent.getOffImage();
            componentOffImageElement_1.onchange = function () {
                _this.currentComponent.setOffImage(componentOffImageElement_1.value);
                _this.currentComponent.onBoardPowerStateChanged(_this.electricBoard.getPowerState());
            };
        }
        {
            var componentPositionXElement_1 = document.getElementById(R.INPUT_COMPONENT_POSITION_X);
            componentPositionXElement_1.value = this.currentComponent.getPosition().getX() + "";
            componentPositionXElement_1.onchange = function () {
                _this.currentComponent.getPosition().setX(parseInt(componentPositionXElement_1.value));
                _this.currentComponent.getView().style.left = _this.currentComponent.getPosition().getX() + "px";
            };
        }
        {
            var componentPositionYElement_1 = document.getElementById(R.INPUT_COMPONENT_POSITION_Y);
            componentPositionYElement_1.value = this.currentComponent.getPosition().getY() + "";
            componentPositionYElement_1.onchange = function () {
                _this.currentComponent.getPosition().setY(parseInt(componentPositionYElement_1.value));
                _this.currentComponent.getView().style.top = _this.currentComponent.getPosition().getY() + "px";
            };
        }
        {
            var customRenderComponent_1 = document.getElementById(R.INPUT_CUSTOM_RENDER);
            customRenderComponent_1.value = this.currentComponent.getCustomRender();
            customRenderComponent_1.onchange = function () {
                _this.currentComponent.setCustomRender(customRenderComponent_1.value.trim());
                _this.currentComponent.onBoardPowerStateChanged(_this.electricBoard.getPowerState());
            };
        }
        document.getElementById(R.BTN_SUBMIT_COMPONENT).style.visibility = "hidden";
    };
    BoardUIController.prototype.updateBoardConfigurations = function () {
        var displayComponentName = document.getElementById(R.INPUT_BOARD_DISPLAY_COMPONENT_NAME);
        if (displayComponentName) {
            this.electricBoard.setDisplayComponentNameState(displayComponentName.checked ? ESwitch.ON : ESwitch.OFF);
        }
        var powerSwitchElement = document.getElementById(R.INPUT_BOARD_POWER_SWITCH);
        if (powerSwitchElement) {
            Log.o(powerSwitchElement.checked);
            this.electricBoard.setPowerState(powerSwitchElement.checked ? ESwitch.ON : ESwitch.OFF);
        }
        var gridRowElement = document.getElementById(R.INPUT_BOARD_GRID_ROW);
        if (gridRowElement) {
            this.electricBoard.setGridRow(parseInt(gridRowElement.value));
        }
        var gridColumnElement = document.getElementById(R.INPUT_BOARD_GRID_COLUMN);
        if (gridColumnElement) {
            this.electricBoard.setGridColumn(parseInt(gridColumnElement.value));
        }
        var backgroundColorElement = document.getElementById(R.INPUT_BOARD_BACKGROUND_COLOR);
        if (backgroundColorElement) {
            this.electricBoard.setBackgroundColor(backgroundColorElement.value);
        }
        this.electricBoard.render();
    };
    BoardUIController.prototype.renderComponentsList = function () {
        var _this = this;
        var container = document.getElementById(R.COMPONENTS_CONTAINER);
        if (!container)
            return;
        container.innerHTML = "";
        var _loop_1 = function (ec) {
            var ecItemView = document.createElement("div");
            ecItemView.innerHTML = "<div class=\"a1-padding a3-container a3-items-center\">        <div class=\"a3-container a3-items-center a3-flex-1 item-container\">            <img src=\"" + ec.getOnImage() + "\" style=\"width:32px; height: 32px\"                class=\"component_image\">            <div class=\"a3-flex-1 a1-padding-left\" class=\"component_name\">" + ec.getName() + "</div>        </div>        <img src=\"assets/images/trash.png\" style=\"width:24px; height: 24px\" class=\"btn_remove\"></i>    </div>";
            var btnRemoves = ecItemView.getElementsByClassName("btn_remove");
            if (btnRemoves.length > 0) {
                btnRemoves[0].onclick = function () {
                    ecItemView.remove();
                    _this.electricBoard.removeElectricComponent(ec);
                };
            }
            var itemContainers = ecItemView.getElementsByClassName("item-container");
            if (itemContainers.length > 0) {
                itemContainers[0].onclick = function () {
                    _this.currentComponent = ec;
                    _this.showComponentDetail(true);
                };
            }
            container.appendChild(ecItemView);
        };
        for (var _i = 0, _a = this.electricBoard.getElectricComponents(); _i < _a.length; _i++) {
            var ec = _a[_i];
            _loop_1(ec);
        }
    };
    return BoardUIController;
}());
