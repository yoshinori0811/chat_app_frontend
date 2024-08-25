import React, { FC, memo, useEffect, useState } from 'react'
import { MessageDropDownMenu } from '../dropDownMenu/messageMenu/messageDropDownMenu'
import { useMutateRoom } from '../../hooks/useMutateRoom'
import { MessageInfo } from '../../types/message'

import {Avatar} from '@mui/material'

import './Message.scss'
import { useAppSelector } from '../../app/hooks'
type InviteRoomId = {
    inviteRoomId: string | undefined
    onUpdate: (uuid: string, content: string) => void
    onDelete: (uuid: string) => void
}
type Message = MessageInfo & InviteRoomId
const MessageMemo: FC<Message> = ({
    id,
    uuid,
    content,
    timestamp,
    user,
    inviteRoomId,
    onUpdate,
    onDelete,
}) => {
    const {inviteRoomMutation} = useMutateRoom()
    const [isEdit, setIsEdit] =useState(false)
    const [editedMessage, setEditedMessage] = useState(content)
    const userInfo = useAppSelector(state => state.user)

    useEffect(() => {
        if(isEdit) {
            setEditedMessage(content)
        }
    }, [isEdit, content])

    const onClickInviteHandler = async (roomId: string) => {
        inviteRoomMutation.mutateAsync({
            uuid: roomId,
        })
    }

    const onClickEditHandler = () => {
        setIsEdit(!isEdit)
    };
    const onClickDeleteHandler = () => {
        onDelete(uuid)
    };

    const keyDownHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            onUpdate(uuid, editedMessage)
            setIsEdit(false)
        } else if(e.key === 'Escape') {
            setEditedMessage(content)
            setIsEdit(false)
        }
    }



    return (
        <div className="messageWrapper">
            <div className='messageCard'>
                <div className='messageContent'>
                    <Avatar />
                    <div className='messageInfo'>
                        <h4>
                            {user.name}
                            <span className='messageTimestamp'>{timestamp}</span>
                        </h4>
                        <div className='messageBody'>
                            {!isEdit ? (
                                <div>{content}</div>
                            ) : (
                                <div className='editMessage'>
                                    <div className='editInput'>
                                        <input
                                            name="editMessage"
                                            type="text"
                                            value={editedMessage}
                                            onChange={(e) => setEditedMessage(e.target.value)}
                                            onKeyDown={keyDownHandler}
                                        />
                                    </div>
                                    <div className='editGuide'>Escキーでキャンセル • Enterキーで 保存</div>
                                </div>
                            )}
                            {
                                inviteRoomId
                                ?
                                    <div className='inviteMessageContent'>
                                        <div>ルームへの招待を送信しました</div>
                                        <div className='inviteMessageBody'>
                                            <div>ルーム名</div>
                                            <div className='messageInviteButton' onClick={() => onClickInviteHandler(inviteRoomId)}>参加</div>
                                        </div>
                                    </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
                {user.name === userInfo?.name ?  (
                    <MessageDropDownMenu onClickEdit={onClickEditHandler} onClickDelete={onClickDeleteHandler} />
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export const Message = memo(MessageMemo)