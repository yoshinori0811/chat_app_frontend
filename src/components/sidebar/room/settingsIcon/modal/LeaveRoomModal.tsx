import React, { FC, memo } from 'react'

import { useMutateRoom } from '../../../../../hooks/useMutateRoom'
import { useParams } from 'react-router-dom'

const LeaveRoomModalMemo: FC<{show: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>>}> = ({
    show,
    setShow,
}) => {
    const {roomId} = useParams()
    const {leaveRoomMutation} = useMutateRoom()

    const onClickLeaveRoomHandler = async () => {
        if(!roomId) {
            return
        }
        leaveRoomMutation.mutateAsync(roomId)
    }
    const onClickCloseHandler = () => {
        console.log("ルーム脱退をキャンセル")
        setShow(false)
    }

    if(show) {
        return (
            <div id="overlay" onClick={onClickCloseHandler}>
                <div className='content'  onClick={e => e.stopPropagation()}>
                    <div className='contentName'>ルーム脱退</div>
                    <div className='field'>
                        <div className='fieldTag'>このルームを脱退しますか？</div>
                    </div>
                    <div className='buttonList'>
                        <button
                            className='cansel'
                            onClick={onClickCloseHandler}
                        >
                            キャンセル
                        </button>
                        <button
                            className="createServer"
                            onClick={onClickLeaveRoomHandler}
                        >
                            ルーム脱退
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export const LeaveRoomModal =memo(LeaveRoomModalMemo)