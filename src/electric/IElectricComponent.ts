interface IElectricComponent extends IObjectBase,IView,IElectricComponentView{
    
    getPosition() : Point;

    turnOn() : void;

    turnOff() : void;

    powerOn() : void;

    powerOff() : void;

    displayComponentName(display : boolean ) : void;

}