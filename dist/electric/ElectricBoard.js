var ElectricBoard = /** @class */ (function () {
    function ElectricBoard(boardElementID) {
        this.boardElementID = "";
        this.powerSwitchState = ESwitch.ON;
        this.displayComponentName = ESwitch.ON;
        this.gridRow = 6;
        this.gridColumn = 6;
        this.backgroundColor = "white";
        this.electricComponents = [];
        this.gridCellSize = new Size();
        this.boardElementID = boardElementID;
    }
    ElectricBoard.prototype.setConfig = function (config) {
        if (!config)
            return;
        if (ParamsKey._POWER_SWITCH_STATE_ in config) {
            this.setPowerSwitchState(config[ParamsKey._POWER_SWITCH_STATE_] == 1 ? ESwitch.ON : ESwitch.OFF);
        }
        if (ParamsKey._DISPLAY_COMPONENT_NAME_ in config) {
            this.setDisplayComponentName(config[ParamsKey._DISPLAY_COMPONENT_NAME_] == 1 ? ESwitch.ON : ESwitch.OFF);
        }
        if (ParamsKey._GRID_ROW_ in config) {
            this.setGridRow(config[ParamsKey._GRID_ROW_]);
        }
        if (ParamsKey._GRID_COLUMN_ in config) {
            this.setGridColumn(config[ParamsKey._GRID_COLUMN_]);
        }
        if (ParamsKey._BACKGROUND_COLOR_ in config) {
            this.setBackgroundColor(config[ParamsKey._BACKGROUND_COLOR_]);
        }
        if (ParamsKey._ELECTRIC_COMPONENTS_ in config) {
            var componentDatas = config[ParamsKey._ELECTRIC_COMPONENTS_];
            if (componentDatas) {
                for (var _i = 0, componentDatas_1 = componentDatas; _i < componentDatas_1.length; _i++) {
                    var data = componentDatas_1[_i];
                    var electricComponent = new CommonElectricComponent();
                    electricComponent.setConfig(data);
                    this.addElectricComponent(electricComponent);
                }
            }
        }
    };
    ElectricBoard.prototype.setGridRow = function (gridRow) {
        this.gridRow = gridRow;
    };
    ElectricBoard.prototype.setGridColumn = function (gridColumn) {
        this.gridColumn = gridColumn;
    };
    ElectricBoard.prototype.getGridRow = function () {
        return this.gridRow;
    };
    ElectricBoard.prototype.getGridColumn = function () {
        return this.gridColumn;
    };
    ElectricBoard.prototype.setBackgroundColor = function (backgroundColor) {
        this.backgroundColor = backgroundColor;
    };
    ElectricBoard.prototype.getBackgroundColor = function () {
        return this.backgroundColor;
    };
    ElectricBoard.prototype.setDisplayComponentName = function (displayComponent) {
        this.displayComponentName = displayComponent;
    };
    ElectricBoard.prototype.getDisplayComponentName = function () {
        return this.displayComponentName;
    };
    ElectricBoard.prototype.setPowerSwitchState = function (powerState) {
        this.powerSwitchState = powerState;
    };
    ElectricBoard.prototype.getPowerSwitchState = function () {
        return this.powerSwitchState;
    };
    ElectricBoard.prototype.getGridCellSize = function () {
        return this.gridCellSize;
    };
    ElectricBoard.prototype.setGridCellSize = function (size) {
        this.gridCellSize = size;
    };
    ElectricBoard.prototype.addElectricComponent = function (component, ignoreWhenCellIsFilled) {
        if (ignoreWhenCellIsFilled === void 0) { ignoreWhenCellIsFilled = true; }
        if (!ignoreWhenCellIsFilled) {
            var found = this.electricComponents.find(function (ec) {
                return ec.getPosition().getX() == component.getPosition().getX() && ec.getPosition().getY() == component.getPosition().getY();
            });
            if (found)
                return;
        }
        this.electricComponents.push(component);
    };
    ElectricBoard.prototype.removeElectricComponent = function (component) {
        var index = this.electricComponents.indexOf(component);
        if (index != -1) {
            this.electricComponents.splice(index, 1);
        }
    };
    ElectricBoard.prototype.getElectricComponents = function () {
        return this.electricComponents;
    };
    ElectricBoard.prototype.render = function () {
        if (!this.boardElementID || this.boardElementID.length == 0)
            return;
        var container = document.getElementById(this.boardElementID);
        if (!container)
            return;
        container.innerHTML = "";
        this.getGridCellSize().setWidth(Math.floor(container.clientWidth / this.getGridColumn()));
        this.getGridCellSize().setHeight(Math.floor(container.clientHeight / this.getGridRow()));
        this.drawGrid(container);
        for (var _i = 0, _a = this.electricComponents; _i < _a.length; _i++) {
            var ec = _a[_i];
            var view = ec.getView();
            ec.render(this);
            container.appendChild(view);
        }
    };
    ElectricBoard.prototype.drawGrid = function (container) {
        if (!container)
            return;
        var width = container.clientWidth;
        var height = container.clientHeight;
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.style.width = width + "px";
        svg.style.height = height + "px";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.position = "absolute";
        svg.style.backgroundColor = this.getBackgroundColor();
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
        container.appendChild(svg);
    };
    return ElectricBoard;
}());
