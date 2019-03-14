var ElectricBoard = /** @class */ (function () {
    function ElectricBoard(boardElementID) {
        this.boardElementID = "";
        this.powerState = ESwitch.ON;
        this.displayComponentNameState = ESwitch.ON;
        this.gridRow = 6;
        this.gridColumn = 6;
        this.backgroundColor = "white";
        this.electricComponents = [];
        this.gridCellSize = new Size();
        this.boardElementID = boardElementID;
        this.view = document.getElementById(boardElementID);
    }
    ElectricBoard.prototype.initialize = function (properties) {
        if (!properties)
            return;
        if (ParamsKey._POWER_STATE_ in properties) {
            this.powerState = properties[ParamsKey._POWER_STATE_] == 1 ? ESwitch.ON : ESwitch.OFF;
        }
        if (ParamsKey._DISPLAY_COMPONENT_NAME_ in properties) {
            this.displayComponentNameState = properties[ParamsKey._DISPLAY_COMPONENT_NAME_] == 1 ? ESwitch.ON : ESwitch.OFF;
        }
        if (ParamsKey._GRID_ROW_ in properties) {
            this.gridRow = properties[ParamsKey._GRID_ROW_];
        }
        if (ParamsKey._GRID_COLUMN_ in properties) {
            this.gridColumn = properties[ParamsKey._GRID_COLUMN_];
        }
        if (ParamsKey._BACKGROUND_COLOR_ in properties) {
            this.backgroundColor = properties[ParamsKey._BACKGROUND_COLOR_];
        }
        this.drawGrid();
        if (ParamsKey._ELECTRIC_COMPONENTS_ in properties) {
            var componentDatas = properties[ParamsKey._ELECTRIC_COMPONENTS_];
            if (componentDatas) {
                for (var _i = 0, componentDatas_1 = componentDatas; _i < componentDatas_1.length; _i++) {
                    var componentProperties = componentDatas_1[_i];
                    var electricComponent = new ElectricComponent();
                    electricComponent.initialize(componentProperties);
                    this.plugInElectricComponent(electricComponent);
                }
            }
        }
    };
    ElectricBoard.prototype.isShowingComponentName = function () {
        return this.displayComponentNameState == ESwitch.ON;
    };
    ElectricBoard.prototype.showComponentName = function () {
        this.displayComponentNameState = ESwitch.ON;
        for (var _i = 0, _a = this.electricComponents; _i < _a.length; _i++) {
            var ec = _a[_i];
            ec.showComponentName(this.isShowingComponentName() ? true : false);
        }
    };
    ElectricBoard.prototype.hideComponentName = function () {
        this.displayComponentNameState = ESwitch.OFF;
        for (var _i = 0, _a = this.electricComponents; _i < _a.length; _i++) {
            var ec = _a[_i];
            ec.showComponentName(this.isShowingComponentName() ? true : false);
        }
    };
    ElectricBoard.prototype.isPowerOn = function () {
        return this.powerState == ESwitch.ON;
    };
    ElectricBoard.prototype.powerOn = function () {
        this.powerState = ESwitch.ON;
        for (var _i = 0, _a = this.electricComponents; _i < _a.length; _i++) {
            var ec = _a[_i];
            ec.powerOn();
        }
    };
    ElectricBoard.prototype.powerOff = function () {
        this.powerState = ESwitch.OFF;
        for (var _i = 0, _a = this.electricComponents; _i < _a.length; _i++) {
            var ec = _a[_i];
            ec.powerOff();
        }
    };
    ElectricBoard.prototype.getGridCellSize = function () {
        return this.gridCellSize;
    };
    ElectricBoard.prototype.setGridRow = function (gridRow) {
        this.gridRow = gridRow;
        this.drawGrid();
        for (var _i = 0, _a = this.electricComponents; _i < _a.length; _i++) {
            var ec = _a[_i];
            ec.updateSizeAndLocation();
        }
    };
    ElectricBoard.prototype.setGridColumn = function (gridColumn) {
        this.gridColumn = gridColumn;
        this.drawGrid();
        for (var _i = 0, _a = this.electricComponents; _i < _a.length; _i++) {
            var ec = _a[_i];
            ec.updateSizeAndLocation();
        }
    };
    ElectricBoard.prototype.getGridColumn = function () {
        return this.gridColumn;
    };
    ElectricBoard.prototype.getGridRow = function () {
        return this.gridRow;
    };
    ElectricBoard.prototype.setBackgroundColor = function (color) {
        this.backgroundColor = color;
        var svgEles = this.getView().getElementsByClassName("board-grid");
        if (svgEles && svgEles.length > 0) {
            svgEles[0].style.backgroundColor = this.getBackgroundColor();
        }
    };
    ElectricBoard.prototype.getBackgroundColor = function () {
        return this.backgroundColor;
    };
    ElectricBoard.prototype.getElectricComponents = function () {
        return this.electricComponents;
    };
    ElectricBoard.prototype.getElectricComponentAtLocation = function (col, row) {
        return this.electricComponents.find(function (ec) {
            return col == ec.getColumn() && row == ec.getRow();
        });
    };
    ElectricBoard.prototype.plugInElectricComponent = function (ec) {
        this.electricComponents.push(ec);
        ec.pluggedIn(this);
        this.addSubView(ec);
    };
    ElectricBoard.prototype.unPlugInElectricComponent = function (ec) {
        var index = this.electricComponents.indexOf(ec);
        if (index == -1)
            return;
        this.electricComponents[index].unPluggedIn();
        this.electricComponents.splice(index, 1);
    };
    ElectricBoard.prototype.getView = function () {
        if (this.view == null)
            this.view = document.createElement("div");
        return this.view;
    };
    ElectricBoard.prototype.setView = function (view) {
        this.view = view;
    };
    ElectricBoard.prototype.addSubView = function (view) {
        this.view.appendChild(view.getView());
    };
    ElectricBoard.prototype.removeSubView = function (view) {
        this.view.removeChild(view.getView());
    };
    ElectricBoard.prototype.drawGrid = function () {
        var grids = this.getView().getElementsByClassName("board-grid");
        for (var i = 0; i < grids.length; i++) {
            grids.item(i).remove();
        }
        var width = this.getView().clientWidth;
        var height = this.getView().clientHeight;
        this.getGridCellSize().set(Math.floor(width / this.getGridColumn()), Math.floor(height / this.getGridRow()));
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.style.backgroundColor = this.getBackgroundColor();
        svg.classList.add("a1-container-absolute");
        svg.classList.add("board-grid");
        for (var i = 0; i < this.gridRow; i++) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "0");
            line.setAttribute("y1", "" + (i / this.gridRow) * height);
            line.setAttribute("x2", "" + width);
            line.setAttribute("y2", "" + (i / this.gridRow) * height);
            line.setAttribute("stroke-width", "0.5");
            line.setAttribute("stroke", "lightgray");
            svg.appendChild(line);
        }
        for (var i = 0; i < this.gridColumn; i++) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "" + (i / this.gridColumn) * width);
            line.setAttribute("y1", "0");
            line.setAttribute("x2", "" + (i / this.gridColumn) * width);
            line.setAttribute("y2", "" + height);
            line.setAttribute("stroke-width", "0.5");
            line.setAttribute("stroke", "lightgray");
            svg.appendChild(line);
        }
        this.getView().insertBefore(svg, this.getView().firstChild);
    };
    return ElectricBoard;
}());
