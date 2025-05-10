export type LoginSuccess = {
    success: true;
    data: {
        token: string;
        name: string;
    };
    message: string;
};

export type LoginError = {
    success: false;
    error: string;
};

export type LoginResponse = LoginSuccess | LoginError;

class Api {
    private readonly baseUrl =
        // ① env var if set …
        `${import.meta.env.VITE_API_URL}/api` ||
        // ② …otherwise derive from the current origin
        `${window.location.origin}/api`;

    /**
     * POST /api/login
     * @param email    user e-mail
     * @param password user password
     * @returns        the JSON you described (success|error)
     */
    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const payload = (await response.json()) as LoginResponse;

        console.log(response);
        console.log(payload);
        if (!response.ok) {
            return {
                success: false,
                error: (payload as any).error ?? ((payload as any).message ?? 'Unexpected error'),
            };
        }

        console.log(1231231);

        return payload;
    }
}

export default new Api();
