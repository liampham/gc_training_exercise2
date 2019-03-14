interface IView {
    getView(): HTMLElement;
    setView(view: HTMLElement);
    addSubView(view: IView);
    removeSubView(view: IView);
}