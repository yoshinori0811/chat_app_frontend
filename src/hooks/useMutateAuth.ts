import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../app/hooks"

import { Credential } from "../types";
import { useError } from "./userError";
import { clearUser } from "../features/userSlice";

export const useMutateAuth = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { switchErrorHandling } = useError()

    const loginMutation = useMutation(
        async (user: Credential) => await axios.post(`${process.env.REACT_APP_API_URL}/login`, user, {withCredentials: true}),
        {
            onSuccess: () => {
                navigate('/home')
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

    const registerMutation = useMutation(
        async (user: Credential) => await axios.post(`${process.env.REACT_APP_API_URL}/signup`, user),
        {
            onError: (err: any) => {
                if (err.response?.data?.message) {
                    switchErrorHandling(err.respose.data.message)
                } else {
                    switchErrorHandling(err.response)
                }
            },
        }
    )

    const logoutMutation = useMutation(
        async () => await axios.post(`${process.env.REACT_APP_API_URL}/logout`, undefined, {withCredentials: true}),
        {
            onSuccess: () => {
                dispatch(clearUser())
                navigate('/')
            },
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHandling(err.response.data.message)
                } else {
                    switchErrorHandling(err.response.data)
                }
            }
        }
    )
    return {loginMutation, registerMutation, logoutMutation}
}