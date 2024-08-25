export type FriendRequestRequest = {
    senderName: string
    receiverName: string
}


export type FriendRequest = {
    name: string
}
export type FriendRequestResponse = {
    user_name: string
}

export type FriendRequestAcceptRequest = {
    user_name: string
}
export type FriendRequestRejectRequest = {
    user_name: string
}

export type FriendResponse = {
    name: string
    room_uuid: string
}