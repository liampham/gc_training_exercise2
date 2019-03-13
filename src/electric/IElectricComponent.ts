interface IElectricComponent extends IObjectBase, IView, IElectricComponentView {
    getCustomRender(): string;
    setCustomRender(renderStr: string): void;

    getName(): string;

    getOnImage(): string;

    getOffImage(): string;

    setOnImage(image: string): void;

    setOffImage(image: string): void;

    getPosition(): Point;

    turnOn(): void;

    turnOff(): void;

    getState(): number;

    getForeColor(): string;

    getPluggedInState(): ESwitch;

    onBoardPowerStateChanged(powerState: ESwitch): void;

    displayComponentName(display: boolean): void;

    changeComponentName(name: string): void;

    changePluggedInState(state: number, boardPowerState: ESwitch);

    changeComponentForeColor(color: string);
}