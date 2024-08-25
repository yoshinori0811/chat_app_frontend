import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';


import { useAppSelector } from '../../../app/hooks'
import { useQueryDm } from '../../../hooks/useQueryDm';
import { Link } from 'react-router-dom';


export function DmSidebar() {
    const {data} = useQueryDm()
    const user = useAppSelector(state => state.user)

    return (
        <div className='sidebarRight'>
            <Link to={"/home"} >
                <div className='sidebarTop'>
                    <PeopleOutlineIcon className='sidebarFriendIcon' />
                    <h3>フレンド</h3>
                </div>
            </Link>
            <div className='sidebarChannels'>
                <div className='sidebarChannelsHeader'>
                    <div className='sidebarHeader'>
                        <h4>ダイレクトメッセージ</h4>
                    </div>
                    <AddIcon className='sidebarAddIcon' />
                </div>
                <ul>
                    {data?.map((dm, i) => (
                        <Link key={i} to={`/home/dm/${dm.room_uuid}`} state={{name: dm.name}} >
                            <li key={i} className='dmwrapper'>
                                <div className='dm'>{dm.name}</div>
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className='sidebarFooter'>
                    <div className='sidebarAccount'>
                        <div className='accountName'>
                            <h4>{user?.name}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}