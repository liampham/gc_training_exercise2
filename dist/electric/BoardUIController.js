var BoardUIController = /** @class */ (function () {
    function BoardUIController(board) {
        this.electricBoard = board;
        this.initializeInputHandlers();
        this.renderComponentsList();
    }
    BoardUIController.prototype.initializeInputHandlers = function () {
        var _this = this;
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
            inputBoardPowerSwitch.checked = this.electricBoard.isPowerOn();
            inputBoardPowerSwitch.onchange = function () {
                _this.onBoardPowerStateChanged();
            };
        }
        var inputDisplayComponentName = document.getElementById(R.INPUT_BOARD_DISPLAY_COMPONENT_NAME);
        if (inputDisplayComponentName) {
            inputDisplayComponentName.checked = this.electricBoard.isDisplayingComponentName();
            inputDisplayComponentName.onchange = function () {
                _this.onDisplayComponentNameStateChanged();
            };
        }
        var inputBoardBackgroundColor = document.getElementById(R.INPUT_BOARD_BACKGROUND_COLOR);
        if (inputBoardBackgroundColor) {
            inputBoardBackgroundColor.value = this.electricBoard.getBackgroundColor();
            inputBoardBackgroundColor.onchange = function () {
                _this.onBoardBackgroundColorChanged();
            };
        }
        var inputBoardGridColumn = document.getElementById(R.INPUT_BOARD_GRID_COLUMN);
        if (inputBoardGridColumn) {
            inputBoardGridColumn.value = this.electricBoard.getGridColumn() + "";
            inputBoardGridColumn.onchange = function () {
                _this.onBoardGridColumnChanged();
            };
        }
        var inputBoardGridRow = document.getElementById(R.INPUT_BOARD_GRID_ROW);
        if (inputBoardGridRow) {
            inputBoardGridRow.value = this.electricBoard.getGridRow() + "";
            inputBoardGridRow.onchange = function () {
                _this.onBoardGridRowChanged();
            };
        }
    };
    BoardUIController.prototype.onBoardGridColumnChanged = function () {
        var inputBoardGridColumn = document.getElementById(R.INPUT_BOARD_GRID_COLUMN);
        if (inputBoardGridColumn) {
            this.electricBoard.setGridColumn(parseInt(inputBoardGridColumn.value));
        }
    };
    BoardUIController.prototype.onBoardGridRowChanged = function () {
        var inputBoardGridRow = document.getElementById(R.INPUT_BOARD_GRID_ROW);
        if (inputBoardGridRow) {
            this.electricBoard.setGridRow(parseInt(inputBoardGridRow.value));
        }
    };
    BoardUIController.prototype.onBoardBackgroundColorChanged = function () {
        var backgroundColorElement = document.getElementById(R.INPUT_BOARD_BACKGROUND_COLOR);
        if (backgroundColorElement) {
            this.electricBoard.setBackgroundColor(backgroundColorElement.value);
        }
    };
    BoardUIController.prototype.onBoardPowerStateChanged = function () {
        var powerSwitchElement = document.getElementById(R.INPUT_BOARD_POWER_SWITCH);
        if (powerSwitchElement) {
            if (powerSwitchElement.checked)
                this.electricBoard.powerOn();
            else
                this.electricBoard.powerOff();
        }
    };
    BoardUIController.prototype.onDisplayComponentNameStateChanged = function () {
        var displayComponentName = document.getElementById(R.INPUT_BOARD_DISPLAY_COMPONENT_NAME);
        if (displayComponentName) {
            if (displayComponentName.checked)
                this.electricBoard.displayComponentNameOn();
            else
                this.electricBoard.displayComponentNameOff();
        }
    };
    BoardUIController.prototype.onClickAddNewComponent = function () {
        var _this = this;
        this.currentComponent = new ElectricComponent();
        this.currentComponent.setColumn(Math.floor(this.electricBoard.getGridColumn() / 2));
        this.currentComponent.setRow(Math.floor(this.electricBoard.getGridRow() / 2));
        this.showComponentDetail(true);
        document.getElementById(R.COMPONENT_NAME).innerText = "Add new component";
        document.getElementById(R.BTN_SUBMIT_COMPONENT).style.visibility = "visible";
        document.getElementById(R.BTN_SUBMIT_COMPONENT).onclick = function () {
            if (Utils.isEmptyString(_this.currentComponent.getName())) {
                window.alert("Component's name empty is not allow!");
                return;
            }
            if (_this.electricBoard.getElectricComponentAtLocation(_this.currentComponent.getColumn(), _this.currentComponent.getRow())) {
                window.alert("Cannot add new component at this location!");
                return;
            }
            _this.electricBoard.plugInComponent(_this.currentComponent);
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
                _this.currentComponent.setName(componentNameElement_1.value);
            };
        }
        {
            var componentPowerStateElement_1 = document.getElementById(R.INPUT_COMPONENT_POWER_STATE);
            componentPowerStateElement_1.checked = this.currentComponent.isTurnedOn();
            componentPowerStateElement_1.onchange = function () {
                if (componentPowerStateElement_1.checked) {
                    _this.currentComponent.turnOn();
                }
                else {
                    _this.currentComponent.turnOff();
                }
            };
        }
        {
            var componentForeColorElement_1 = document.getElementById(R.INPUT_COMPONENT_FORECOLOR);
            componentForeColorElement_1.value = this.currentComponent.getForeColor();
            componentForeColorElement_1.onchange = function () {
                _this.currentComponent.setForeColor(componentForeColorElement_1.value);
            };
        }
        {
            var componentOnImageElement_1 = document.getElementById(R.INPUT_COMPONENT_ON_IMAGE);
            componentOnImageElement_1.value = this.currentComponent.getOnImage();
            componentOnImageElement_1.onchange = function () {
                _this.currentComponent.setOnImage(componentOnImageElement_1.value);
            };
        }
        {
            var componentOffImageElement_1 = document.getElementById(R.INPUT_COMPONENT_OFF_IMAGE);
            componentOffImageElement_1.value = this.currentComponent.getOffImage();
            componentOffImageElement_1.onchange = function () {
                _this.currentComponent.setOffImage(componentOffImageElement_1.value);
            };
        }
        {
            var componentPositionXElement_1 = document.getElementById(R.INPUT_COMPONENT_POSITION_X);
            componentPositionXElement_1.value = this.currentComponent.getColumn() + "";
            componentPositionXElement_1.onchange = function () {
                _this.currentComponent.setColumn(parseInt(componentPositionXElement_1.value));
            };
        }
        {
            var componentPositionYElement_1 = document.getElementById(R.INPUT_COMPONENT_POSITION_Y);
            componentPositionYElement_1.value = this.currentComponent.getRow() + "";
            componentPositionYElement_1.onchange = function () {
                _this.currentComponent.setRow(parseInt(componentPositionYElement_1.value));
            };
        }
        {
            var customRenderComponent_1 = document.getElementById(R.INPUT_CUSTOM_RENDER);
            customRenderComponent_1.value = this.currentComponent.getCustomRender();
            customRenderComponent_1.onchange = function () {
                _this.currentComponent.setCustomRender(customRenderComponent_1.value.trim());
            };
        }
        document.getElementById(R.BTN_SUBMIT_COMPONENT).style.visibility = "hidden";
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
                    _this.electricBoard.unPlugInComponent(ec);
                    ecItemView.remove();
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
