import { UserInfo } from "./user"

export type MessageInfo = {
    id: number
    uuid: string
    content: string
    timestamp: string
    user: UserInfo
}

export type BroadCastMessage = {
    type: string
    message_info: MessageInfo
}

export type MessageCreateRequest = {
    // room_uuid: string
    content: string
}

export type MessageUpdateRequest = {
    content: string
}

export type MessageUpdateMutation = {
    messagePathParam: string
    request: MessageUpdateRequest
}

export type MessageCreateInviteMutation = {
    roomPathParam: string
    request: MessageCreateRequest
}

export type GetMoreMessageMutation = {
    roomId: string
    offset: number
}