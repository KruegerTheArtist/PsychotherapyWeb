export class Config {
    api: string;
    public constructor(init?: Partial<Config>) {
        Object.assign(this, init);
    }
}