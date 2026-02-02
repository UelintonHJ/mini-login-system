export const AuthStatus = {
    INITIALIZING: "initializing",
    IDLE: "idle",
    LOADING: "loading",
    AUTHENTICATED: "authenticated",
    ERROR: "error",
} as const;

export type AuthStatus =
    (typeof AuthStatus)[keyof typeof AuthStatus];