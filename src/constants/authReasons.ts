export const AuthReason = {
    NOT_AUTHENTICATED: "not_authenticated",
    SESSION_EXPIRED: "session_expired",
    LOGOUT: "logout",
} as const;

export type AuthReason =
    typeof AuthReason[keyof typeof AuthReason];