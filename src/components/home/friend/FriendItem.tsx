import { FC, memo } from "react";
import { FriendResponse } from "../../../types/friend";
import './FriendItem.scss'
import { useNavigate } from 'react-router-dom'

const FriendItemMemo: FC<FriendResponse> = ({
    name,
    room_uuid
}) => {
    const navigate = useNavigate()
    const onClickHandler = async () => {
        navigate(`/home/dm/${room_uuid}`)
    }
    return (
        <div className="friendRows" onClick={onClickHandler}>
            <span>{name}</span>
            <div className='actions'>
                <div className="dmAction" onClick={onClickHandler}>DM</div>
                <div className="otherAction">その他</div>
            </div>
        </div>
    )
}

export const FriendItem = memo(FriendItemMemo)