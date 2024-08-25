import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { RoomChatInfoResponse, GetRoomsResponse } from "../types/room";

// export const useQueryRoom = () => {
export const useQueryRooms = () => {
    // エラーハンドリングの○○を呼び出す

    const getRooms = async () => {
        const {data} = await axios.get<GetRoomsResponse[]>(
            `${process.env.REACT_APP_API_URL}/rooms/`,
            {withCredentials: true}
        )
        return data
    }
    return useQuery<GetRoomsResponse[], Error>({
        queryKey: ['rooms'],
        queryFn: getRooms,
        staleTime: Infinity,
        onError: (err: any) => {
            console.log(err)
        },
    })
}

export const useQueryRoomMember = (id: string) => {
    const getRoomMemberList = async () => {
        const {data} = await axios.get<RoomChatInfoResponse>(
            `${process.env.REACT_APP_API_URL}/rooms/${id}/`,
            {withCredentials: true}
        )
        return data
    }
    return useQuery<RoomChatInfoResponse, Error>({
        queryKey: ['roomMemberList', id],
        queryFn: getRoomMemberList,
        staleTime: Infinity,
        onError: (err: any) => {
            console.log(err)
        },
    })
}