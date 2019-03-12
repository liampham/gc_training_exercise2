class Log {

    private static enable: boolean = true;

    public static setEnable(enable: boolean): void {
        this.enable = enable;
    }

    public static isEnable(): boolean {
        return this.enable;
    }

    public static m(provider: string, message: string) {
        if (!this.isEnable()) return;
        console.log(provider, message);
    }

    public static d(str: string) {
        if (!this.isEnable()) return;
        console.log("Debug: ", str);
    }

    public static e(str: string) {
        if (!this.isEnable()) return;
        console.log("Error: ", str);
    }

    public static w(str: string) {
        if (!this.isEnable()) return;
        console.log("Warning: ", str);
    }

    public static o(object: any) {
        if (!this.isEnable()) return;
        console.log(object);
    }
}