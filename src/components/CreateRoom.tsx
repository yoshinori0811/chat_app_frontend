import React, { FC, memo, useState } from 'react'
import { useMutateRoom } from '../hooks/useMutateRoom'
import { useAppSelector } from '../app/hooks'

import './CreateRoom.scss'

const CreateRoomMemo: FC<{show: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>>}> = ({
    show,
    setShow,
}) => {
    const [serverName, setServerName] = useState('')
    const user = useAppSelector(state => state.user)

    const {createRoomMutation} = useMutateRoom()

    const onClickCreateRoomHandler = async () => {
        if(!user?.name) {
            return
        }
        createRoomMutation.mutate({
            name: serverName,
        })
        setShow(false)
        setServerName('')
    }
    const onClickCloseHandler = () => {
        setShow(false)
        setServerName('')
    }

    if(show) {
        return (
            <div id="overlay" onClick={onClickCloseHandler}>
                <div className='content'  onClick={e => e.stopPropagation()}>
                    <div className='contentName'>ルームの追加</div>
                    <div className='field'>
                        <div className='fieldTag'>ルーム名</div>
                        <input
                            name="name"
                            type="text"
                            placeholder='ルーム名'
                            onChange={(e) => setServerName(e.target.value)}
                            value={serverName}
                        />
                    </div>
                    <div className='buttonList'>
                        <button
                            className='close'
                            onClick={onClickCloseHandler}
                        >
                            閉じる
                        </button>
                        <button
                            className="createRoom"
                            disabled={!serverName}
                            onClick={onClickCreateRoomHandler}
                        >
                            ルーム作成
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export const CreateRoom =memo(CreateRoomMemo)