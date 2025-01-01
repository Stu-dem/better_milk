
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME || 30
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME || 40

export function getTokenExpiry(tokenType: "access" | "refresh") {
    const expiryDate = new Date()
    expiryDate.setSeconds(expiryDate.getSeconds() + Number(tokenType === "access" ? ACCESS_TOKEN_LIFETIME : REFRESH_TOKEN_LIFETIME))
    return expiryDate.toISOString();
}