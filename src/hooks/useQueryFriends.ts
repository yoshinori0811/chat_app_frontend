import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FriendResponse } from "../types/friend";

export const useQueryFriends = () => {

    const getFriends = async () => {
        const {data} = await axios.get<FriendResponse[]>(
            `${process.env.REACT_APP_API_URL}/friends`,
            {withCredentials: true}
        )
        return data
    }
    return useQuery<FriendResponse[], Error>({
        queryKey: ['friends'],
        queryFn: getFriends,
        staleTime: Infinity,
        onError: (err: any) => {
            console.log(err)
        },
    })
}