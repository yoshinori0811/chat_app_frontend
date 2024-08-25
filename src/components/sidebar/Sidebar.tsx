import React, { FC, memo, useState } from 'react'
import "./Sidebar.scss"
import AddIcon from '@mui/icons-material/Add';

import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { SidebarData } from './SidebarData';
import { useMutateAuth } from '../../hooks/useMutateAuth';
import { Link } from 'react-router-dom';
import { useQueryRooms } from "../../hooks/useQueryRoom"
import { CreateRoom } from '../CreateRoom';
import { RoomSidebar } from './room/RoomSidebar';
import { DmSidebar } from './dm/DmSidebar';


export const SidebarMemo: FC<{isRoom: boolean}> = ({
    isRoom
}) => {
    const [isCreateServerVisible, setCreateServerVisible] = useState(false)
    const {data} = useQueryRooms()
    const { logoutMutation } = useMutateAuth()
    const logout = async () => {
        await logoutMutation.mutateAsync()
    }

    const onClickHandler = () => {
        setCreateServerVisible(!isCreateServerVisible)
    }

    return (
    <div className='sidebar'>
        <div className='sidebarLeft'>
            <ul>
                {SidebarData.map((v, i) => {
                    return (
                        <Link key={i}  to={v.link}>
                            <li className="sidebarIcon" >
                                <img className='sidebarImgIcon' src={v.src} alt={v.title}/>
                            </li>
                        </Link>
                    )
                })}
                {data?.map((v, i) => (
                    <Link key={i} to={`/home/rooms/${v.uuid}`}>
                        <li className='sidebarIcon sidebarRoomIcon'>
                            <div>{v.name}</div>
                        </li>
                    </Link>
                ))}
                <li className='sidebarIcon' onClick={onClickHandler}>
                    <AddIcon className='sidebarImgIcon addRoom'/>
                </li>
            </ul>
            <div className='sidebarIcon'>
                <ArrowRightOnRectangleIcon
                    onClick={logout}
                    className="logout"
                />
            </div>
        </div>

        {isRoom ? <RoomSidebar /> : <DmSidebar />}
        <CreateRoom show={isCreateServerVisible} setShow={setCreateServerVisible} />
    </div>
    )
}

export const Sidebar =memo(SidebarMemo)