var BoardUIController = /** @class */ (function () {
    function BoardUIController(board) {
        this.electricBoard = board;
        this.initializeInputHandlers();
    }
    BoardUIController.prototype.initializeInputHandlers = function () {
        var _this = this;
        var btnApplyBoardConfiguration = document.getElementById("btn_apply_board_configuration");
        if (btnApplyBoardConfiguration) {
            btnApplyBoardConfiguration.onclick = function () {
                _this.updateBoardConfigurations();
            };
        }
        var btnCloseComponentDetailView = document.getElementById("btn_close_component_detail");
        if (btnCloseComponentDetailView) {
            btnCloseComponentDetailView.onclick = function () {
                _this.showComponentDetail(false);
            };
        }
    };
    BoardUIController.prototype.showComponentDetail = function (show) {
        var listComponentContainer = document.getElementById("list_components_container");
        if (listComponentContainer) {
            listComponentContainer.style.display = show ? "none" : "block";
        }
        var componentDetailContainer = document.getElementById("component_detail_container");
        if (componentDetailContainer) {
            componentDetailContainer.style.display = show ? "block" : "none";
        }
    };
    BoardUIController.prototype.updateBoardConfigurations = function () {
        var displayComponentName = document.getElementById("input_board_display_component_name");
        if (displayComponentName) {
            this.electricBoard.setDisplayComponentName(displayComponentName.checked ? ESwitch.ON : ESwitch.OFF);
        }
        var powerSwitchElement = document.getElementById("input_board_power_switch");
        if (powerSwitchElement) {
            Log.o(powerSwitchElement.checked);
            this.electricBoard.setPowerSwitchState(powerSwitchElement.checked ? ESwitch.ON : ESwitch.OFF);
        }
        var gridRowElement = document.getElementById("input_board_grid_row");
        if (gridRowElement) {
            this.electricBoard.setGridRow(parseInt(gridRowElement.value));
        }
        var gridColumnElement = document.getElementById("input_board_grid_column");
        if (gridColumnElement) {
            this.electricBoard.setGridColumn(parseInt(gridColumnElement.value));
        }
        var backgroundColorElement = document.getElementById("input_board_background_color");
        if (backgroundColorElement) {
            this.electricBoard.setBackgroundColor(backgroundColorElement.value);
        }
        this.electricBoard.render();
    };
    return BoardUIController;
}());
