import React from 'react'

import { useQueryFriends } from '../../../hooks/useQueryFriends'
import { FriendItem } from '../friend/FriendItem'
import './FriendList.scss'

export const FriendList = () => {
    const {data, isLoading} = useQueryFriends()

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                {data?.map((value, i) => (
                    <li className='friends' key={i}>
                        <FriendItem name={value.name} room_uuid={value.room_uuid} />
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}
