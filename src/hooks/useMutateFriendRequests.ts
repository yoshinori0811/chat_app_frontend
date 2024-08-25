import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { FriendRequestAcceptRequest, FriendRequestRejectRequest } from "../types/friend";

export const useMutateFriendRequests = () => {

    const acceptMutation = useMutation(
        async (friendRequest: FriendRequestAcceptRequest) => await axios.put(`${process.env.REACT_APP_API_URL}/friends/requests/accept`, friendRequest, {withCredentials: true}),
        {
            onSuccess: () => {
                window.alert("フレンド申請を承認しました。")
            },
            onError: () => {
                window.alert("フレンド申請の承認に失敗しました。")
            },
        }
    )

    const rejectMutation = useMutation(
        async (friendRequest: FriendRequestRejectRequest) => await axios.put(`${process.env.REACT_APP_API_URL}/friends/requests/reject`, friendRequest),
        {
            onSuccess: () => {
                window.alert("フレンド申請を拒否しました。")
            },
            onError: () => {
                window.alert("フレンド申請の拒否に失敗しました。")
            },
        }
    )

    return {acceptMutation, rejectMutation}
}