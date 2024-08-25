import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FriendResponse } from "../types/friend";
import { RoomChatInfoResponse } from "../types/room";

export const useQueryDm = () => {

    const getDmList = async () => {
        const {data} = await axios.get<FriendResponse[]>(
            `${process.env.REACT_APP_API_URL}/dmlist`,
            {withCredentials: true}
        )
        return data
    }
    return useQuery<FriendResponse[], Error>({
        queryKey: ['dmList'],
        queryFn: getDmList,
        staleTime: Infinity,
        onError: (err: any) => {
            console.log(err)
        },
    })
}

export const useQueryDmMember = (id: string) => {

    const getDmMemberList = async () => {
        const {data} = await axios.get<RoomChatInfoResponse>(
            `${process.env.REACT_APP_API_URL}/rooms/${id}/`,
            {withCredentials: true}
        )
        return data
    }
    return useQuery<RoomChatInfoResponse, Error>({
        queryKey: ['dmMemberList', id],
        queryFn: getDmMemberList,
        staleTime: Infinity,
        onError: (err: any) => {
            console.log(err)
        },
    })
}