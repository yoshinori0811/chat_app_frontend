import { FC, memo } from "react";
import { FriendRequest } from "../../../types/friend";
import { useMutateFriendRequests } from "../../../hooks/useMutateFriendRequests";

const FriendRequestItemMemo: FC<FriendRequest> = ({
    name
}) => {
    // フレンド申請の承認、拒否の処理を呼び出す
    const { acceptMutation, rejectMutation} = useMutateFriendRequests()
    return (
        <li>
            <span>{name}</span>
            <div>
                <button onClick={() => {
                    acceptMutation.mutate({
                        user_name: name
                    })
                }}>承認</button>
                <button onClick={() => {
                    rejectMutation.mutate({
                            user_name: name
                        }
                    )
                }}>拒否</button>
            </div>
        </li>
    )
}

export const FriendRequestItem = memo(FriendRequestItemMemo)