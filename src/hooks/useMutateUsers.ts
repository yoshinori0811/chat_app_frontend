import axios from "axios";
import { useMutation } from "@tanstack/react-query";

// TODO: 呼び出されていないためファイルが不要？
export const useMutateUsers = () => {
    const getUsers = useMutation(
        async (userName: string) => await axios.post(
            `${process.env.REACT_APP_API_URL}/users`,
            {
                params: {
                    query: userName
                }
            },
        ),
        {
            onError: (err: any) => {
            },
        }
    )

    return {getUsers}
}