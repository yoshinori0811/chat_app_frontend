import React from "react"

import {Sidebar} from "../../sidebar/Sidebar"
import { MessageContent } from "../../messageContent/MessageContent"

import "./Dm.scss"

export const Dm = () => {

    return(
        <div className="wrapper">
            <Sidebar isRoom={false}/>
            <div className="dmMessageContentWrapper">
                <MessageContent />
            </div>
        </div>

    )
}