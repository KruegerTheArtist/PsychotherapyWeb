export class UserShort {
    login: string;
    password: string;

    public constructor(init?: Partial<UserShort>) {
        Object.assign(this, init);
    }
}