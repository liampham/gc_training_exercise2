class BoardUIController {

    public electricBoard: IElectricBoard;

    public currentComponent: IElectricComponent;

    constructor(board: IElectricBoard) {
        this.electricBoard = board;
        this.initializeInputHandlers();
        this.renderComponentsList();
    }

    private initializeInputHandlers() {
        let btnApplyBoardConfiguration = document.getElementById(R.BTN_APPLY_BOARD_CONFIGURATION);
        if (btnApplyBoardConfiguration) {
            btnApplyBoardConfiguration.onclick = () => {
                this.updateBoardConfigurations();
            }
        }

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
            inputBoardPowerSwitch.onchange = () => {
                this.onPowerStateChanged();
            }
        }

        let inputDisplayComponentName = document.getElementById(R.INPUT_BOARD_DISPLAY_COMPONENT_NAME);
        if (inputDisplayComponentName) {
            inputDisplayComponentName.onchange = () => {
                this.onDisplayComponentNameStateChanged();
            }
        }


        let inputBoardBackgroundColor = document.getElementById(R.INPUT_BOARD_BACKGROUND_COLOR);
        if (inputBoardBackgroundColor) {
            inputBoardBackgroundColor.onchange = () => {
                this.onBoardBackgroundColorChanged();
            }
        }




    }
    private onBoardBackgroundColorChanged() {
        let backgroundColorElement: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_BACKGROUND_COLOR);
        if (backgroundColorElement) {
            this.electricBoard.setBackgroundColor(backgroundColorElement.value);
            this.electricBoard.changeBackgroundColor();
        }
    }

    private onPowerStateChanged() {
        let powerSwitchElement: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_POWER_SWITCH);
        if (powerSwitchElement) {
            this.electricBoard.setPowerState(powerSwitchElement.checked ? ESwitch.ON : ESwitch.OFF);
            for (let ec of this.electricBoard.getElectricComponents()) {
                ec.onBoardPowerStateChanged(this.electricBoard.getPowerState());
            }
        }
    }

    private onDisplayComponentNameStateChanged() {
        let displayComponentName: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_DISPLAY_COMPONENT_NAME);
        if (displayComponentName) {
            this.electricBoard.setDisplayComponentNameState(displayComponentName.checked ? ESwitch.ON : ESwitch.OFF);
            for (let ec of this.electricBoard.getElectricComponents()) {
                ec.displayComponentName(displayComponentName.checked);
            }
        }

    }

    public onClickAddNewComponent() {
        this.currentComponent = new CommonElectricComponent();
        this.currentComponent.getPosition().set(240,240);
        this.showComponentDetail(true);
        document.getElementById(R.COMPONENT_NAME).innerText = "Add new component";

        (<HTMLElement>document.getElementById(R.BTN_SUBMIT_COMPONENT)).style.visibility = "visible";

        (<HTMLElement>document.getElementById(R.BTN_SUBMIT_COMPONENT)).onclick = ()=>{
            if(Utils.isEmptyString(this.currentComponent.getName())) return;
            this.electricBoard.pluggedInNewComponent(this.currentComponent);
            this.showComponentDetail(false);
            this.renderComponentsList();
        }
    }
    public showComponentDetail(show: boolean) {
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
                this.currentComponent.changeComponentName(componentNameElement.value);
            }
        }

        {
            let componentPowerStateElement = (<HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_POWER_STATE));
            componentPowerStateElement.checked = this.currentComponent.getPluggedInState() == ESwitch.ON ? true : false;
            componentPowerStateElement.onchange = () => {
                this.currentComponent.changePluggedInState(componentPowerStateElement.checked ? 1 : 0, this.electricBoard.getPowerState());
            }
        }

        {
            let componentForeColorElement = <HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_FORECOLOR);
            componentForeColorElement.value = this.currentComponent.getForeColor();
            componentForeColorElement.onchange = () => {
                this.currentComponent.changeComponentForeColor(componentForeColorElement.value);
            }
        }

        {
            let componentOnImageElement = <HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_ON_IMAGE);
            componentOnImageElement.value = this.currentComponent.getOnImage();
            componentOnImageElement.onchange = () => {
                this.currentComponent.setOnImage(componentOnImageElement.value);
                this.currentComponent.onBoardPowerStateChanged(this.electricBoard.getPowerState());
            }
        }
        {
            let componentOffImageElement = <HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_OFF_IMAGE);
            componentOffImageElement.value = this.currentComponent.getOffImage();
            componentOffImageElement.onchange = () => {
                this.currentComponent.setOffImage(componentOffImageElement.value);
                this.currentComponent.onBoardPowerStateChanged(this.electricBoard.getPowerState());
            }
        }

        {
            let componentPositionXElement = <HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_POSITION_X);
            componentPositionXElement.value = this.currentComponent.getPosition().getX() + "";
            componentPositionXElement.onchange = () => {
                this.currentComponent.getPosition().setX(parseInt(componentPositionXElement.value));
                this.currentComponent.getView().style.left = `${this.currentComponent.getPosition().getX()}px`;
            }
        }

        {
            let componentPositionYElement = <HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_POSITION_Y);
            componentPositionYElement.value = this.currentComponent.getPosition().getY() + "";
            componentPositionYElement.onchange = () => {
                this.currentComponent.getPosition().setY(parseInt(componentPositionYElement.value));
                this.currentComponent.getView().style.top = `${this.currentComponent.getPosition().getY()}px`;
            }
        }

        {
            let customRenderComponent = <HTMLInputElement>document.getElementById(R.INPUT_CUSTOM_RENDER);
            customRenderComponent.value = this.currentComponent.getCustomRender();
            customRenderComponent.onchange = () => {
                this.currentComponent.setCustomRender(customRenderComponent.value.trim());
                this.currentComponent.onBoardPowerStateChanged(this.electricBoard.getPowerState());

            }
        }

        (<HTMLElement>document.getElementById(R.BTN_SUBMIT_COMPONENT)).style.visibility = "hidden";

    }

    public updateBoardConfigurations(): void {

        let displayComponentName: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_DISPLAY_COMPONENT_NAME);
        if (displayComponentName) {
            this.electricBoard.setDisplayComponentNameState(displayComponentName.checked ? ESwitch.ON : ESwitch.OFF);
        }

        let powerSwitchElement: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_POWER_SWITCH);
        if (powerSwitchElement) {
            Log.o(powerSwitchElement.checked);
            this.electricBoard.setPowerState(powerSwitchElement.checked ? ESwitch.ON : ESwitch.OFF);
        }

        let gridRowElement: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_GRID_ROW);
        if (gridRowElement) {
            this.electricBoard.setGridRow(parseInt(gridRowElement.value));
        }

        let gridColumnElement: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_GRID_COLUMN);
        if (gridColumnElement) {
            this.electricBoard.setGridColumn(parseInt(gridColumnElement.value));
        }

        let backgroundColorElement: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_BOARD_BACKGROUND_COLOR);
        if (backgroundColorElement) {
            this.electricBoard.setBackgroundColor(backgroundColorElement.value);
        }

        this.electricBoard.render();
    }

    private renderComponentsList() {
        let container = document.getElementById(R.COMPONENTS_CONTAINER);
        if (!container) return;

        container.innerHTML = "";

        for (let ec of this.electricBoard.getElectricComponents()) {
            let ecItemView = document.createElement("div");

            ecItemView.innerHTML = `<div class=\"a1-padding a3-container a3-items-center\">        <div class=\"a3-container a3-items-center a3-flex-1 item-container\">            <img src=\"${ec.getOnImage()}\" style=\"width:32px; height: 32px\"                class=\"component_image\">            <div class=\"a3-flex-1 a1-padding-left\" class=\"component_name\">${ec.getName()}</div>        </div>        <img src=\"assets/images/trash.png\" style=\"width:24px; height: 24px\" class=\"btn_remove\"></i>    </div>`;

            let btnRemoves = ecItemView.getElementsByClassName("btn_remove");
            if (btnRemoves.length > 0) {
                (<HTMLElement>btnRemoves[0]).onclick = () => {
                    ecItemView.remove();
                    this.electricBoard.removeElectricComponent(ec);
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