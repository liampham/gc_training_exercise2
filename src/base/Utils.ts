class Utils {

    public static isEmptyString(str: string): boolean {
        return (!str || 0 === str.length);
    }
    public static clamp(val: number, min: number, max: number) : number{
        if (val < min) return min;
        else if (val > max) return max;
        else return val;
    }
}