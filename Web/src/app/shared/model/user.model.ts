import { UserRole } from '../enum/user-role.enum'

export class User {
    id: string;
    login: string;
    password: string;
    role: UserRole;
    refreshToken: string;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
