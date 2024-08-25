export type CsrfToken = {
    csrf_token: string
}
export type Credential = {
    userName: string
    email: string
    password: string
}

export type AuthResponse = {
    name: string
    email: string
}