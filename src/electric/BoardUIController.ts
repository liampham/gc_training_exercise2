class BoardUIController {

    public electricBoard: IElectricBoard;

    public currentComponent: IElectricComponent;

    constructor(board: IElectricBoard) {
        this.electricBoard = board;
        this.initializeInputHandlers();
        this.renderComponentsList();
        
    }
  
    private initializeInputHandlers() {

        let btnCloseComponentDetailView = document.getElementById(R.BTN_CLOSE_COMPONENT_DETAIL);
        if (btnCloseComponentDetailView) {
            btnCloseComponentDetailView.onclick = () => {
                this.showComponentDetail(false);
            }
        }

        let btnAddNewComponent = document.getElementById(R.BTN_ADD_COMPONENT);
        if (btnAddNewComponent) {
            btnAddNewComponent.onclick = () => {
                this.onClickAddNewComponent();
            }
        }


        let inputBoardPowerSwitch = document.getElementById(R.INPUT_BOARD_POWER_SWITCH);
        if (inputBoardPowerSwitch) {
            (<HTMLInputElement>inputBoardPowerSwitch).checked = this.electricBoard.isPowerOn();
            inputBoardPowerSwitch.onchange = () => {
                this.onBoardPowerStateChanged();
            }
        }

        let inputDisplayComponentName = document.getElementById(R.INPUT_BOARD_DISPLAY_COMPONENT_NAME);
        if (inputDisplayComponentName) {
            (<HTMLInputElement>inputDisplayComponentName).checked = this.electricBoard.isShowingComponentName();
            inputDisplayComponentName.onchange = () => {
                this.onDisplayComponentNameStateChanged();
            }
        }


        let inputBoardBackgroundColor = document.getElementById(R.INPUT_BOARD_BACKGROUND_COLOR);
        if (inputBoardBackgroundColor) {
            (<HTMLInputElement>inputBoardBackgroundColor).value = this.electricBoard.getBackgroundColor();
            inputBoardBackgroundColor.onchange = () => {
                this.onBoardBackgroundColorChanged();
            }
        }

        let inputBoardGridColumn = document.getElementById(R.INPUT_BOARD_GRID_COLUMN);
        if (inputBoardGridColumn) {
            (<HTMLInputElement>inputBoardGridColumn).value = this.electricBoard.getGridColumn()+"";
            inputBoardGridColumn.onchange = () => {
                this.onBoardGridColumnChanged();
            }
        }

        let inputBoardGridRow = document.getElementById(R.INPUT_BOARD_GRID_ROW);
        if (inputBoardGridRow) {
            (<HTMLInputElement>inputBoardGridRow).value = this.electricBoard.getGridRow()+"";
            inputBoardGridRow.onchange = () => {
                this.onBoardGridRowChanged();
            }
        }

    }

    private onBoardGridColumnChanged() {
        let inputBoardGridColumn: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_GRID_COLUMN);
        if (inputBoardGridColumn) {
            this.electricBoard.setGridColumn(parseInt(inputBoardGridColumn.value));
        }
    }

    private onBoardGridRowChanged() {
        let inputBoardGridRow: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_GRID_ROW);
        if (inputBoardGridRow) {
            this.electricBoard.setGridRow(parseInt(inputBoardGridRow.value));
        }
    }

    private onBoardBackgroundColorChanged() {
        let backgroundColorElement: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_BACKGROUND_COLOR);
        if (backgroundColorElement) {
            this.electricBoard.setBackgroundColor(backgroundColorElement.value);
        }
    }

    private onBoardPowerStateChanged() {
        let powerSwitchElement: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_POWER_SWITCH);
        if (powerSwitchElement) {
            if (powerSwitchElement.checked) this.electricBoard.powerOn();
            else this.electricBoard.powerOff();
        }
    }

    private onDisplayComponentNameStateChanged() {
        let showComponentName: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_DISPLAY_COMPONENT_NAME);
        if (showComponentName) {
            if (showComponentName.checked) this.electricBoard.showComponentName();
            else this.electricBoard.hideComponentName();
        }
    }

    private onClickAddNewComponent() {
        this.currentComponent = new ElectricComponent();
        this.currentComponent.setColumn(Math.floor(this.electricBoard.getGridColumn() / 2))
        this.currentComponent.setRow(Math.floor(this.electricBoard.getGridRow() / 2))

        this.showComponentDetail(true);
        document.getElementById(R.COMPONENT_NAME).innerText = "Add new component";

        (<HTMLElement>document.getElementById(R.BTN_SUBMIT_COMPONENT)).style.visibility = "visible";

        (<HTMLElement>document.getElementById(R.BTN_SUBMIT_COMPONENT)).onclick = () => {
            if (Utils.isEmptyString(this.currentComponent.getName())) {
                window.alert("Component's name empty is not allow!");
                return;
            }
            if (this.electricBoard.getElectricComponentAtLocation(this.currentComponent.getColumn(), this.currentComponent.getRow())) {
                window.alert("Cannot add new component at this location!");
                return;
            }
            this.electricBoard.plugInElectricComponent(this.currentComponent);
            this.showComponentDetail(false);
            this.renderComponentsList();
        }
    }

    private showComponentDetail(show: boolean) {
        let listComponentContainer = document.getElementById(R.LIST_COMPONENTS_CONTAINER);
        if (listComponentContainer) { listComponentContainer.style.display = show ? "none" : "block"; }
        let componentDetailContainer = document.getElementById(R.COMPONENT_DETAIL_CONTAINER);
        if (componentDetailContainer) { componentDetailContainer.style.display = show ? "block" : "none"; }

        if (!this.currentComponent) return;

        document.getElementById(R.COMPONENT_NAME).innerText = "Component Detail";

        {
            let componentNameElement = <HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_NAME);
            componentNameElement.value = this.currentComponent.getName();
            componentNameElement.onchange = () => {
                this.currentComponent.setName(componentNameElement.value);
            }
        }

        {
            let componentPowerStateElement = (<HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_POWER_STATE));
            componentPowerStateElement.checked = this.currentComponent.isTurnedOn();
            componentPowerStateElement.onchange = () => {
                if (componentPowerStateElement.checked) {
                    this.currentComponent.turnOn();
                } else {
                    this.currentComponent.turnOff();
                }
            }
        }

        {
            let componentForeColorElement = <HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_FORECOLOR);
            componentForeColorElement.value = this.currentComponent.getForeColor();
            componentForeColorElement.onchange = () => {
                this.currentComponent.setForeColor(componentForeColorElement.value);
            }
        }

        {
            let componentOnImageElement = <HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_ON_IMAGE);
            componentOnImageElement.value = this.currentComponent.getOnImage();
            componentOnImageElement.onchange = () => {
                this.currentComponent.setOnImage(componentOnImageElement.value);
            }
        }
        {
            let componentOffImageElement = <HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_OFF_IMAGE);
            componentOffImageElement.value = this.currentComponent.getOffImage();
            componentOffImageElement.onchange = () => {
                this.currentComponent.setOffImage(componentOffImageElement.value);
            }
        }

        {
            let componentPositionXElement = <HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_POSITION_X);
            componentPositionXElement.value = this.currentComponent.getColumn() + "";
            componentPositionXElement.onchange = () => {
                this.currentComponent.setColumn(parseInt(componentPositionXElement.value));
            }
        }

        {
            let componentPositionYElement = <HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_POSITION_Y);
            componentPositionYElement.value = this.currentComponent.getRow() + "";
            componentPositionYElement.onchange = () => {
                this.currentComponent.setRow(parseInt(componentPositionYElement.value));
            }
        }

        {
            let customRenderComponent = <HTMLInputElement>document.getElementById(R.INPUT_CUSTOM_RENDER);
            customRenderComponent.value = this.currentComponent.getCustomRender();
            customRenderComponent.onchange = () => {
                this.currentComponent.setCustomRender(customRenderComponent.value.trim());
            }
        }

        (<HTMLElement>document.getElementById(R.BTN_SUBMIT_COMPONENT)).style.visibility = "hidden";

    }

    private renderComponentsList() {
        let container = document.getElementById(R.COMPONENTS_CONTAINER);
        if (!container) return;

        container.innerHTML = "";

        for (let ec of this.electricBoard.getElectricComponents()) {
            let ecItemView = document.createElement("div");
            ecItemView.innerHTML = `<div class=\"a1-padding a3-container a3-items-center\">        <div class=\"a3-container a3-items-center a3-flex-1 item-container cursor-pointer\">            <img src=\"${ec.getOnImage()}\" style=\"width:32px; height: 32px\"                class=\"component_image cursor-pointer\">            <div class=\"a3-flex-1 a1-padding-left\" class=\"component_name\">${ec.getName()}</div>        </div>        <img src=\"assets/images/trash.png\" style=\"width:24px; height: 24px\" class=\"btn_remove\"></i>    </div>`;
            let btnRemoves = ecItemView.getElementsByClassName("btn_remove");
            if (btnRemoves.length > 0) {
                (<HTMLElement>btnRemoves[0]).onclick = () => {
                    this.electricBoard.unPlugInElectricComponent(ec);
                    ecItemView.remove();
                }
            }
            let itemContainers = ecItemView.getElementsByClassName("item-container");
            if (itemContainers.length > 0) {
                (<HTMLElement>itemContainers[0]).onclick = () => {
                    this.currentComponent = ec;
                    this.showComponentDetail(true);
                }
            }

            container.appendChild(ecItemView);

        }
    }
}