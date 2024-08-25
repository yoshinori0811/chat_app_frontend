import React, { FC, memo } from 'react';
import { BaseDropDownMunu, Option } from '../BaseDropDownMenu';

type OnClick = {
    onClickEdit: () => void
    onClickDelete: () => void
}
const MessageDropDownMenuMemo: FC<OnClick> = ({
    onClickEdit,
    onClickDelete,
}) => {
    const handleOptionEditSelect = () => {
        onClickEdit()
    };
    const handleOptionDeleteSelect = () => {
        onClickDelete()
    };

    const messageMenuData: Option[] = [
        {
            value: 1,
            label: "編集",
            handler: () => {handleOptionEditSelect()}
        },
        {
            value: 2,
            label: "削除",
            handler: () => {handleOptionDeleteSelect()}
        }
    ]

    return (
        <div >
            <BaseDropDownMunu options={messageMenuData} />
        </div>
    );
};

export const MessageDropDownMenu = memo(MessageDropDownMenuMemo)