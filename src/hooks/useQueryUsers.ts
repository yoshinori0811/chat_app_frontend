import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { User } from "../types/user";

export const useQueryUsers = (userName: string) => {
    const getUsers = async () => {
        const { data } = await axios.get<User[]> (
            `${process.env.REACT_APP_API_URL}/users`,
            {
                params: {
                    query: userName,
                },
                withCredentials: true,
            },
        )
        return data
    }

    return useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: getUsers,
        staleTime: Infinity,
        enabled: !userName,
        onError: (err :any) => {
            console.log(err)
        },
    })
}