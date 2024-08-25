import React, { FC, memo } from 'react'

import { useMutateRoom } from '../../../../../hooks/useMutateRoom'
import { useParams } from 'react-router-dom'

const DeleteRoomModalMemo: FC<{show: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>>}> = ({
    show,
    setShow,
}) => {
    const {roomId} = useParams()
    const {deleteRoomMutation} = useMutateRoom()

    const onClickDeleteRoomHandler = async () => {
        if(!roomId) {
            return
        }
        deleteRoomMutation.mutateAsync(roomId)
    }
    const onClickCloseHandler = () => {
        setShow(false)
    }

    if(show) {
        return (
            <div id="overlay" onClick={onClickCloseHandler}>
                <div className='content'  onClick={e => e.stopPropagation()}>
                    <div className='contentName'>ルーム削除</div>
                    <div className='field'>
                        <div className='fieldTag'>このルームを削除しますか？</div>
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
                            onClick={onClickDeleteRoomHandler}
                        >
                            ルーム削除
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export const DeleteRoomModal =memo(DeleteRoomModalMemo)