import React from "react"
import { Navbar } from "./navbar/Navbar"
import { Sidebar } from "../sidebar/Sidebar"
import { FriendList } from "./friendList/FriendList"
import './Home.scss'
import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import { setUser } from "../../features/userSlice";
import axios from "axios"
import { AuthResponse } from "../../types"

export const Home = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async() => {
            const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/user`, {withCredentials: true})
            dispatch(setUser({
                photo: "",
                name: response.data.name,
                email: response?.data?.email,
            }))
        })()

    }, [])
    return(
        <div className="wrapper">
            <Sidebar isRoom={false}/>
            <div>
                <Navbar />
                <FriendList />
            </div>
        </div>

    )
}