class BoardUIController {

    public electricBoard: ElectricBoard;

    public currentComponent: AElectricComponent;

    constructor(board: ElectricBoard) {
        this.electricBoard = board;
        this.initializeInputHandlers();
    }

    private initializeInputHandlers() {
        let btnApplyBoardConfiguration = document.getElementById("btn_apply_board_configuration");
        if (btnApplyBoardConfiguration) {
            btnApplyBoardConfiguration.onclick = () => {
                this.updateBoardConfigurations();
            }
        }

        let btnCloseComponentDetailView = document.getElementById("btn_close_component_detail");
        if (btnCloseComponentDetailView) {
            btnCloseComponentDetailView.onclick = () => {
                this.showComponentDetail(false);
            }
        }

        let btnAddNewComponent = document.getElementById("btn_add_component");
        if (btnAddNewComponent) {
            btnAddNewComponent.onclick = () => {
                this.onClickAddNewComponent();
            }
        }
    }
    public onClickAddNewComponent() {
        if (this.currentComponent) return;

        let component = new CommonElectricComponent();

        let displayComponentName: HTMLInputElement = <HTMLInputElement>document.getElementById("input_component_name");
        if (displayComponentName) {
            component.setName(displayComponentName.value.trim());
        }


    }
    public showComponentDetail(show: boolean) {
        let listComponentContainer = document.getElementById("list_components_container");
        if (listComponentContainer) { listComponentContainer.style.display = show ? "none" : "block"; }
        let componentDetailContainer = document.getElementById("component_detail_container");
        if (componentDetailContainer) { componentDetailContainer.style.display = show ? "block" : "none"; }
    }

    public updateBoardConfigurations(): void {

        let displayComponentName: HTMLInputElement = <HTMLInputElement>document.getElementById("input_board_display_component_name");
        if (displayComponentName) {
            this.electricBoard.setDisplayComponentName(displayComponentName.checked ? ESwitch.ON : ESwitch.OFF);
        }

        let powerSwitchElement: HTMLInputElement = <HTMLInputElement>document.getElementById("input_board_power_switch");
        if (powerSwitchElement) {
            Log.o(powerSwitchElement.checked);
            this.electricBoard.setPowerSwitchState(powerSwitchElement.checked ? ESwitch.ON : ESwitch.OFF);
        }

        let gridRowElement: HTMLInputElement = <HTMLInputElement>document.getElementById("input_board_grid_row");
        if (gridRowElement) {
            this.electricBoard.setGridRow(parseInt(gridRowElement.value));
        }

        let gridColumnElement: HTMLInputElement = <HTMLInputElement>document.getElementById("input_board_grid_column");
        if (gridColumnElement) {
            this.electricBoard.setGridColumn(parseInt(gridColumnElement.value));
        }

        let backgroundColorElement: HTMLInputElement = <HTMLInputElement>document.getElementById("input_board_background_color");
        if (backgroundColorElement) {
            this.electricBoard.setBackgroundColor(backgroundColorElement.value);
        }

        this.electricBoard.render();
    }
}