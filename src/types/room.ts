import { MessageInfo } from "./message"
export type RoomCreateRequest = {
    name?: string
    members?: string[]
    admin_user_name?: string
}

export type RoomCreateResponse = {
    uuid: string
    name?: string
}
export type GetRoomsResponse = {
    name: string
    uuid: string
}


export type RoomChatInfoResponse = {
    name: string
    uuid: string
    is_admin: boolean
    members: string[]
    messages: MessageInfo[]
}

export type RoomInviteRequest = {
    uuid: string
}
export type eRoomInvitResponse = {
    uuid: string
}