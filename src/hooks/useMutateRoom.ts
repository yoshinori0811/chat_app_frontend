import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { eRoomInvitResponse, GetRoomsResponse, RoomCreateRequest, RoomCreateResponse, RoomInviteRequest } from "../types/room";

export const useMutateRoom = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const createRoomMutation = useMutation(
        async (data: RoomCreateRequest) => await axios.post<RoomCreateResponse>(`${process.env.REACT_APP_API_URL}/rooms/create`, data, {withCredentials: true}),
        {
            onSuccess: (res) => {
                const data = res.data as GetRoomsResponse
                queryClient.setQueryData<GetRoomsResponse[] | undefined>(["rooms"], old => {
                    return old  ? [data, ...old] : [data]
                })
                navigate('/home/rooms/' + res.data.uuid)
            },
            onError: (err: any) => {
                console.log(err)
                navigate(`/home/`)
            }
        }
    )

    const inviteRoomMutation = useMutation(
        async (data: RoomInviteRequest) => await axios.post<eRoomInvitResponse>(`${process.env.REACT_APP_API_URL}/rooms/${data.uuid}/invite`, {withCredentials: true}),
        {
            onSuccess: (res) => {
                navigate('/home/rooms/' + res.data.uuid)
            },
            onError: (err: any) => {
                console.log(err)
                window.alert("ルームに参加できませんでした。")
                navigate(`/home/`)
            }
        }
    )

    const deleteRoomMutation = useMutation(
        async (uuid: string) => {
            await axios.delete(`${process.env.REACT_APP_API_URL}/rooms/${uuid}/delete`)
            return uuid
        },
        {
            onSuccess: (uuid) => {
                queryClient.setQueryData<GetRoomsResponse[]>(["rooms"], old => {
                    return old ? old.filter(v => v.uuid !== uuid) :[]
                })
                navigate('/home/')
            },
            onError: (err: any) => {
                console.log(err)
                window.alert("ルームを削除できませんでした。")
                navigate('/home/')
            }
        }
    )

    const leaveRoomMutation = useMutation(
        async (uuid: string) => {
            await axios.delete(`${process.env.REACT_APP_API_URL}/rooms/${uuid}/leave`)
            return uuid
            },
            {
            onSuccess: (uuid) => {
                queryClient.setQueryData<GetRoomsResponse[]>(["rooms"], old => {
                    return old?.length ? old.filter(v => v.uuid !== uuid) : []
                })
                navigate('/home/')
            },
            onError: (err: any) => {
                console.log(err)
                window.alert("ルームを脱退できませんでした。")
                navigate('/home/')
            }
        }
    )


    return {createRoomMutation, inviteRoomMutation, deleteRoomMutation, leaveRoomMutation}
}