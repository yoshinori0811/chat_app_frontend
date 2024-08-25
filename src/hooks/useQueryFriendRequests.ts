import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FriendRequestResponse } from "../types/friend";

export const useQueryFriendRequests = () => {

    const getFriendRequests = async () => {
        const {data} = await axios.get<FriendRequestResponse[]>(
            `${process.env.REACT_APP_API_URL}/friends/requests`,
            {withCredentials: true}
        )
        return data
    }
    return useQuery<FriendRequestResponse[], Error>({
        queryKey: ['friendRequests'],
        queryFn: getFriendRequests,
        staleTime: Infinity,
        onError: (err: any) => {
            console.log(err)
        },
    })
}