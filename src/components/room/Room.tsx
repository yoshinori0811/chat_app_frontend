import React from "react"
import { Sidebar } from "../sidebar/Sidebar"
import { useState, FormEvent, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useQueryDmMember } from "../../hooks/useQueryDm"
import { useMutateMessage } from "../../hooks/useMutateMessage"

import { MessageInfo } from "../../types/message"

import { useAppSelector } from "../../app/hooks"
import "./Room.scss"
import { MessageContent } from "../messageContent/MessageContent"


export const Room = () => {

    return(
        <div className="wrapper">
            <Sidebar isRoom={true}/>
            <div className="roomMessageContentWrappper">
                <MessageContent />
            </div>
        </div>

    )
}