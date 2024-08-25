export interface InitialUserState {
    user: null | {
        photo: string,
        email: string,
        name: string,
    }
}

export type User = {
    name: string
}

export type UserInfo = {
    name: string
}