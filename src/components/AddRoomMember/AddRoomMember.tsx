import React, { FC, memo, useEffect, useState } from 'react'

import './AddRoomMember.scss'
import { useQueryFriends } from '../../hooks/useQueryFriends'
import { useMutateMessage } from '../../hooks/useMutateMessage'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { FriendResponse } from '../../types/friend'

const AddRoomMemberMemo: FC<{show: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>>}> = ({
    show,
    setShow,
}) => {
    const [friendName, setFriendName] = useState('')
    const [inviteStatus, setInviteStatus] = useState<{[key: string]: boolean}>({})
    const user = useAppSelector(state => state.user)
    const {data} = useQueryFriends()
    const {createInviteMutation} = useMutateMessage(undefined)
    const { roomId } = useParams()

    const onClickSendInviteRoomHandler = async (data: FriendResponse) => {
        if(!roomId || !user?.name) {
            return
        }
        try {
            const message = `招待リンク\n\n${process.env.REACT_APP_API_URL}/rooms/${roomId}/invite`;
            createInviteMutation.mutateAsync({
                roomPathParam: data.room_uuid,
                request: {
                    content: message,
                }
            })
            // 成功したらステータスを更新
            setInviteStatus(prev => ({...prev, [data.room_uuid]: true}))
        } catch(err) {
            console.error("招待に失敗しました", err)
        }
    }

    const onClickCloseHandler = () => {
        setShow(false)
        setFriendName('')
    }

    useEffect(() => {
        if (!show) {
            setInviteStatus({})
        }
    }, [show])


    if(show) {
        return (
            <div id="overlay" onClick={onClickCloseHandler}>
                <div className='content'  onClick={e => e.stopPropagation()}>
                    <div className='contentName'>メンバーの追加</div>
                    <div className='field'>
                        <div className='fieldTag'>友達を検索</div>
                        <input
                            name="name"
                            type="text"
                            placeholder='友達を検索'
                            onChange={(e) => setFriendName(e.target.value)}
                            value={friendName}
                        />
                    </div>
                    <div className='buttonList'>
                        <button
                            className="createServer"
                            disabled={!friendName}
                        >
                            検索
                        </button>
                    </div>
                    <div>
                        <div>友達リスト</div>
                        <div>
                            <ul>
                                {data?.map((v, i) => (
                                    <li key={i}>
                                        <div className='friendName'>{v.name}</div>
                                        {
                                            inviteStatus[v.room_uuid]
                                            ? <div>送信済</div>
                                            : <div className='button' onClick={() => onClickSendInviteRoomHandler(v)}>招待</div>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export const AddRoomMember =memo(AddRoomMemberMemo)