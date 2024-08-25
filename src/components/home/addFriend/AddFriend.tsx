import React from 'react'
import { useState, FormEvent } from "react"
import axios from "axios";

import { User } from '../../../types/user';
import { FriendRequestRequest } from '../../../types/friend';
import { Navbar } from '../navbar/Navbar';
import {Sidebar} from '../../sidebar/Sidebar';
import './AddFriend.scss'

export const AddFriend = () => {
    // FORMで入力された値が格納される
    const [term, setTerm] = useState('')
    const [users, setUsers] = useState<User[]>([])

    // ユーザー検索APIを叩く処理
    const searchUsers = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const params = {
                query: term
            }
            const response = await axios.get<User[]>(`${process.env.REACT_APP_API_URL}/users`, { params })
            setUsers(response.data)
            if(!response.data) {
                window.alert("ユーザーが見つかりませんでした。")
            }
        } catch {
            window.alert("ユーザー検索に失敗しました。")
        }
    }

    const friendRequest = async (receiverName: string) => {
        try {
            const reqBody = {
                user_name: receiverName,
            }
            const response = await axios.post<FriendRequestRequest>(`${process.env.REACT_APP_API_URL}/friends/requests`, reqBody)
            if(response.status !== 200) {
                window.alert("フレンド申請に失敗しました。")
            }
            window.alert('フレンド申請に成功しました。')
        } catch {
            window.alert("フレンド申請に失敗しました。")
        }
    }

    return (
        <div className="wrapper">
            <Sidebar isRoom={false}/>
            <div>
                <Navbar />
                <div className='container'>
                    <form onSubmit={searchUsers}>
                        <div>
                            <input
                                name="userName"
                                type="text"
                                placeholder="user name"
                                onChange={(e) => setTerm(e.target.value)}
                                value={term}
                                />
                        </div>
                        <button
                            className=""
                            disabled={!term}
                            type="submit"
                        >
                            検索
                        </button>
                    </form>
                    <ul>
                        {users.map((user, index) => {
                            return (
                                <li key={index}>
                                    <div>{user.name}</div>
                                    <button onClick={() => friendRequest(user.name)}>申請</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}