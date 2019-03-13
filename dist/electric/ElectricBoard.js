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
    }
    ElectricBoard.prototype.setGridRow = function (gridRow) { this.gridRow = gridRow; };
    ElectricBoard.prototype.setGridColumn = function (gridColumn) { this.gridColumn = gridColumn; };
    ElectricBoard.prototype.getGridRow = function () { return this.gridRow; };
    ElectricBoard.prototype.getGridColumn = function () { return this.gridColumn; };
    ElectricBoard.prototype.setBackgroundColor = function (backgroundColor) { this.backgroundColor = backgroundColor; };
    ElectricBoard.prototype.getBackgroundColor = function () { return this.backgroundColor; };
    ElectricBoard.prototype.setDisplayComponentNameState = function (displayComponentState) { this.displayComponentNameState = displayComponentState; };
    ElectricBoard.prototype.getDisplayComponentNameState = function () { return this.displayComponentNameState; };
    ElectricBoard.prototype.setPowerState = function (powerState) { this.powerState = powerState; };
    ElectricBoard.prototype.getPowerState = function () { return this.powerState; };
    ElectricBoard.prototype.setGridCellSize = function (size) { this.gridCellSize = size; };
    ElectricBoard.prototype.getGridCellSize = function () { return this.gridCellSize; };
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
            this.electricComponents[index].getView().remove();
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
        this.getGridCellSize().set(Math.floor(container.clientWidth / this.getGridColumn()), Math.floor(container.clientHeight / this.getGridRow()));
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
    //Override
    ElectricBoard.prototype.initialize = function (properties) {
        if (!properties)
            return;
        if (ParamsKey._POWER_STATE_ in properties) {
            this.setPowerState(properties[ParamsKey._POWER_STATE_] == 1 ? ESwitch.ON : ESwitch.OFF);
        }
        if (ParamsKey._DISPLAY_COMPONENT_NAME_ in properties) {
            this.setDisplayComponentNameState(properties[ParamsKey._DISPLAY_COMPONENT_NAME_] == 1 ? ESwitch.ON : ESwitch.OFF);
        }
        if (ParamsKey._GRID_ROW_ in properties) {
            this.setGridRow(properties[ParamsKey._GRID_ROW_]);
        }
        if (ParamsKey._GRID_COLUMN_ in properties) {
            this.setGridColumn(properties[ParamsKey._GRID_COLUMN_]);
        }
        if (ParamsKey._BACKGROUND_COLOR_ in properties) {
            this.setBackgroundColor(properties[ParamsKey._BACKGROUND_COLOR_]);
        }
        if (ParamsKey._ELECTRIC_COMPONENTS_ in properties) {
            var componentDatas = properties[ParamsKey._ELECTRIC_COMPONENTS_];
            if (componentDatas) {
                for (var _i = 0, componentDatas_1 = componentDatas; _i < componentDatas_1.length; _i++) {
                    var componentProperties = componentDatas_1[_i];
                    var electricComponent = new CommonElectricComponent();
                    electricComponent.initialize(componentProperties);
                    this.addElectricComponent(electricComponent);
                }
            }
        }
    };
    ElectricBoard.prototype.changeBackgroundColor = function () {
        if (!this.boardElementID || this.boardElementID.length == 0)
            return;
        var container = document.getElementById(this.boardElementID);
        if (!container)
            return;
        var svgEles = container.getElementsByTagName("svg");
        if (svgEles && svgEles.length > 0) {
            svgEles[0].style.backgroundColor = this.getBackgroundColor();
        }
    };
    ElectricBoard.prototype.pluggedInNewComponent = function (electricComponent) {
        this.addElectricComponent(electricComponent);
        if (!this.boardElementID || this.boardElementID.length == 0)
            return;
        var container = document.getElementById(this.boardElementID);
        if (!container)
            return;
        electricComponent.render(this);
        container.appendChild(electricComponent.getView());
    };
    return ElectricBoard;
}());
