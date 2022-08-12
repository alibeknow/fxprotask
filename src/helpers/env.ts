class Env {

    public static get(key: string, defaultValue: string = null): string {
        return process.env[key] || defaultValue;
    }
}

export default Env;