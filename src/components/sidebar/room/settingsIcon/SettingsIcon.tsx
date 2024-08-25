import React, { FC, memo, useEffect, useRef, useState } from 'react'
import { DeleteRoomModal } from './modal/DeleteRoomModal'
import { LeaveRoomModal } from './modal/LeaveRoomModal'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'
import './SettingsIcon.scss'

type Props = {isAdmin: boolean}
const SettingsIconMemo: FC<Props> = ({
    isAdmin,
}) => {
    const [showSettings, setShowSettings] = useState(false)
    const settingsRef = useRef<HTMLDivElement>(null)

    const handleIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setShowSettings(prevShowSettings => !prevShowSettings)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false)
        }
    }


    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div ref={settingsRef} className='SettingsIconWrapper'>
            <div className="settingsIconToggle"  onClick={(handleIconClick)} style={{ cursor: 'pointer' }} >
                {showSettings
                ?
                    <CloseIcon />
                :
                    <ExpandMoreIcon />
                }
            </div>
            {showSettings && <Settings isAdminUser={isAdmin} />}
        </div>
    );
};

type SettingsProps = {
    isAdminUser: boolean
}

const Settings: FC<SettingsProps> = ({
    isAdminUser
}) => {
    const [showDeleteRoomModal, setshowDeleteRoomModal] = useState(false);
    const [showLeaveRoomModal, setshowLeaveRoomModal] = useState(false);

    const onClickDeleteRoomModalHandler = () => {
        setshowDeleteRoomModal(!showDeleteRoomModal)
    }
    const onClickLeaveRoomModalHandler = () => {
        setshowLeaveRoomModal(!showLeaveRoomModal)
    }

    return (
        <div className="settingIonSettings">
        <ul>
            <li className='settingIonMenuItem'>友達を招待</li>
            <li className='settingIonMenuItem'>ルーム名変更</li>
            {isAdminUser
                ?
                    <li className='settingIonMenuItem' onClick={onClickDeleteRoomModalHandler}>ルーム削除</li>
                :
                    <li className='settingIonMenuItem' onClick={onClickLeaveRoomModalHandler}>ルーム脱退</li>
            }
        </ul>
        <DeleteRoomModal show={showDeleteRoomModal} setShow={setshowDeleteRoomModal} />
        <LeaveRoomModal show={showLeaveRoomModal} setShow={setshowLeaveRoomModal} />
    </div>
    )
};

export const SettingsIcon = memo(SettingsIconMemo);
