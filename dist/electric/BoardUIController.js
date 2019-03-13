var BoardUIController = /** @class */ (function () {
    function BoardUIController(board) {
        this.electricBoard = board;
        this.initializeInputHandlers();
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
    };
    BoardUIController.prototype.onClickAddNewComponent = function () {
        if (this.currentComponent)
            return;
        var component = new CommonElectricComponent();
        var displayComponentName = document.getElementById(R.INPUT_COMPONENT_NAME);
        if (displayComponentName) {
            component.setName(displayComponentName.value.trim());
        }
    };
    BoardUIController.prototype.showComponentDetail = function (show) {
        var listComponentContainer = document.getElementById(R.LIST_COMPONENTS_CONTAINER);
        if (listComponentContainer) {
            listComponentContainer.style.display = show ? "none" : "block";
        }
        var componentDetailContainer = document.getElementById(R.COMPONENT_DETAIL_CONTAINER);
        if (componentDetailContainer) {
            componentDetailContainer.style.display = show ? "block" : "none";
        }
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
    return BoardUIController;
}());
