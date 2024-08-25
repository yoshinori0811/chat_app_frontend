import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'

import { useAppSelector } from '../../../app/hooks'
import { useQueryRoomMember } from '../../../hooks/useQueryRoom'
import { AddRoomMember } from '../../AddRoomMember/AddRoomMember'

import './RoomSidebar.scss'
import { useParams } from 'react-router-dom'
import { SettingsIcon } from './settingsIcon/SettingsIcon'
import { RoomChatInfoResponse } from '../../../types/room'


export function RoomSidebar() {
    const [isCreateServerVisible, setCreateServerVisible] = useState(false)
    const user = useAppSelector(state => state.user)
    const { roomId } = useParams()
    const {data} =useQueryRoomMember(roomId ?? "")
    const [roomInfo, setRoomInfo] = useState<RoomChatInfoResponse|undefined>(data)
    const isAdmin = roomInfo?.is_admin ?? true;
    useEffect(() => {
        setRoomInfo(data)
    }, [roomId, data])

    const onClickHandler = () => {
        setCreateServerVisible(!isCreateServerVisible)
    }

    return (
        <div className='sidebarRight'>
            <div className='roomSidebarTop'>
                <h3 className='roomSidebarRoomName'>{roomInfo?.name}</h3>
                <div className='roomSidebarSettingsIcon'>
                    <SettingsIcon  isAdmin={isAdmin} />
                </div>
            </div>
            <div className='sidebarChannels'>
                <div>
                    <div className='memberList'>
                        <div># メンバー</div>
                        <AddIcon className='roomSidebarMemberAddIcon' onClick={onClickHandler} />
                    </div>
                    <ul>
                        {roomInfo?.members?.map((member, i) => (
                            <li key={i} className='memberwrapper'>
                                <div className='member'>{member}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='sidebarFooter'>
                    <div className='sidebarAccount'>
                        <div className='accountName'>
                            <h4>{user?.name}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <AddRoomMember show={isCreateServerVisible} setShow={setCreateServerVisible} />
        </div>
    )
}
