class BoardUIController {

    public electricBoard: IElectricBoard;

    public currentComponent: AElectricComponent;

    constructor(board: IElectricBoard) {
        this.electricBoard = board;
        this.initializeInputHandlers();
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
    }

    public onClickAddNewComponent() {
        if (this.currentComponent) return;

        let component = new CommonElectricComponent();

        let displayComponentName: HTMLInputElement = <HTMLInputElement>document.getElementById(R.INPUT_COMPONENT_NAME);
        if (displayComponentName) {
            component.setName(displayComponentName.value.trim());
        }


    }
    public showComponentDetail(show: boolean) {
        let listComponentContainer = document.getElementById(R.LIST_COMPONENTS_CONTAINER);
        if (listComponentContainer) { listComponentContainer.style.display = show ? "none" : "block"; }
        let componentDetailContainer = document.getElementById(R.COMPONENT_DETAIL_CONTAINER);
        if (componentDetailContainer) { componentDetailContainer.style.display = show ? "block" : "none"; }
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
}