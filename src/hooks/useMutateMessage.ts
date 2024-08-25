import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { useError } from "./userError";
import { GetMoreMessageMutation, MessageCreateInviteMutation, MessageCreateRequest, MessageInfo, MessageUpdateMutation } from "../types/message";
import { MessageServiceClient } from "../pb/web/src/proto/MessageServiceClientPb";
import { GetMessageRequest } from "../pb/web/src/proto/message_pb";

export const useMutateMessage = (roomId: string | undefined) => {
    const { switchErrorHandling } = useError()

    const createMutation = useMutation(
        async (request: MessageCreateRequest) => await axios.post(`${process.env.REACT_APP_API_URL}/rooms/${roomId}/`, request, {withCredentials: true}),
        {
            onSuccess: () => {
                console.log("メッセージの送信に成功しました。")
            },
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHandling(err.response.data.message)
                } else {
                    switchErrorHandling(err)
                }
            },
        }
    )
    const createInviteMutation = useMutation(
        async (data: MessageCreateInviteMutation) => await axios.post(`${process.env.REACT_APP_API_URL}/rooms/${data.roomPathParam}/`, data.request, {withCredentials: true}),
        {
            onSuccess: () => {
                console.log("メッセージの送信に成功しました。")
            },
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHandling(err.response.data.message)
                } else {
                    switchErrorHandling(err)
                }
            },
        }
    )
    const updateMutation = useMutation(
        async (data: MessageUpdateMutation) => await axios.patch<MessageInfo>(`${process.env.REACT_APP_API_URL}/rooms/${roomId}/messages/${data.messagePathParam}/`, data.request, {withCredentials: true}),
        {
            onSuccess: (res) => {
                console.log("メッセージの編集に成功しました。")
                console.log(res)
                return res.data
            }
        }
    )

    const deleteMutation = useMutation(
        async (messagePathParam: string) => await axios.delete<MessageInfo>(`${process.env.REACT_APP_API_URL}/rooms/${roomId}/messages/${messagePathParam}/`, {withCredentials: true}),
        {
            onSuccess: (res) => {
                console.log("メッセージの編集に成功しました。")
                console.log(res)
            }
        }
    )

    const getMoreMutation = useMutation(
        async (data: GetMoreMessageMutation) => {
            const client = new MessageServiceClient(`${process.env.REACT_APP_GRPC_URL}`, null, {
                withCredentials: true
            })
            const req = new GetMessageRequest()
            req.setUuid(data.roomId)
            req.setOffset(data.offset)
            const res = await client.getMessages(req)
            return res
        }
    )

    return {createMutation, createInviteMutation, updateMutation, deleteMutation, getMoreMutation}
}