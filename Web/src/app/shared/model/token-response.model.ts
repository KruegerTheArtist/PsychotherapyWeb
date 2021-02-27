export class TokenResponse {
    accessToken: string;
    login: string;
    refreshToken: string;
    success: boolean;
    errorMessage: string;

    public constructor(init?: Partial<TokenResponse>) {
        Object.assign(this, init);
    }
}