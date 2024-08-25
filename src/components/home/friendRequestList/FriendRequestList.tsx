import React from 'react'

import { Navbar } from '../navbar/Navbar'
import { useQueryFriendRequests } from '../../../hooks/useQueryFriendRequests'
import { FriendRequestItem } from '../friend/FriendRequestItem'
import {Sidebar} from "../../sidebar/Sidebar"
import './FriendRequestList.scss'

export const FriendRequestList = () => {
  const {data, isLoading} = useQueryFriendRequests()

  return (
    <div className='wrapper'>
      <Sidebar isRoom={false}/>
      <div className='friendRequestContainer'>
        <Navbar />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data?.map((value) => (
              <FriendRequestItem name={value.user_name} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
