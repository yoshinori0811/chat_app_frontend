import React, { useCallback, useRef } from "react"
import { useState, FormEvent, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useQueryDmMember } from "../../hooks/useQueryDm"
import { useMutateMessage } from "../../hooks/useMutateMessage"

import { MessageInfo } from "../../types/message"

import { useAppSelector } from "../../app/hooks"

import "./MessageContent.scss"
import { Message } from "../message/Message"
import { MessageServiceClient } from "../../pb/web/src/proto/MessageServiceClientPb"
import { ConnectRequest, MessageResponse,  } from "../../pb/web/src/proto/message_pb"


export const MessageContent = () => {
    const { roomId } = useParams()
    const [isVisibility, setIsVisibility] = useState(false)
    const {data: initialMessages, refetch} = useQueryDmMember(roomId ?? "")
    const [sendMessage, setSendMessage] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [messages, setMessages] = useState<MessageInfo[]>(initialMessages?.messages ?? [])
    const {createMutation, updateMutation, deleteMutation, getMoreMutation} = useMutateMessage(roomId)
    const user = useAppSelector(state => state.user)
    const messageRef = useRef<HTMLLIElement>(null);
    const messageListRef = useRef<HTMLUListElement>(null);
    const messageListParentRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [loading, setLoading] = useState(false);

    const apiUrlEscaped = `${process.env.REACT_APP_API_URL}/rooms/`.replace(/\//g, '\\/')
    const invitePattern = `([^/]+)\\/invite`
    const regExp = new RegExp(apiUrlEscaped + invitePattern)
    const endDiv = useRef<HTMLDivElement>(null)

    const submitMessageHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(roomId && user) {
            createMutation.mutateAsync({
                content: sendMessage,
            })
        }
        setSendMessage("")
    }

    const updateMessageHandler = (uuid: string, newContent: string) => {
        if(!roomId) {
            console.log("ルームIDが存在しないためupdateMessageHandlerを終了しました。")
            return
        }
        updateMutation.mutateAsync({
            messagePathParam: uuid,
            request: {
                content: newContent,
            },
        })
    }

    const deleteMessageHandler = (uuid: string) => {
        if(!roomId) {
            console.log("ルームIDが存在しないためdeleteMessageHandlerを終了しました。")
        return
        }
        deleteMutation.mutateAsync(uuid)
    }

    const loadMore = useCallback(async (messages: MessageInfo[]) => {
        if(loading || !roomId || !messages?.length) {
            return
        }
        setLoading(true)

        try {
            const res = await getMoreMutation.mutateAsync({
                roomId: roomId,
                offset: messages.length,
            })
            const newMessages = res.toObject().messagesList as MessageInfo[]

            if (!newMessages?.length) {
                setHasMore(false)
                return
            }

            setMessages((prevMessages) => {
                const scrollTop = messageListParentRef.current?.scrollTop;
                const scrollHeight = messageListParentRef.current?.scrollHeight;
                const newScrollTop = (scrollHeight ?? 0) - (scrollTop ?? 0)
                setScrollTop(newScrollTop)
                return [...newMessages, ...prevMessages]
            })
        } finally {
            setLoading(false)
        }
    }, [roomId, getMoreMutation, loading])

    useEffect(() => {
        refetch()
        setMessages(initialMessages?.messages ?? [])
    }, [initialMessages, refetch])

    useEffect(() => {
        const client = new MessageServiceClient(`${process.env.REACT_APP_GRPC_URL}`, null, {
            timeout: 10 * 60 * 1000,
            withCredentials: true,
        })
        const req = new ConnectRequest()
        if(!roomId) {
            return
        }
        req.setUuid(roomId)
        const connection = client.connect(req)

        connection.on("data", (m: MessageResponse) => {
            const type = m.getType()

            if(type === "update") {
                setMessages(prev => prev.map(v => {
                    if (v.uuid !== m.getMessageInfo()?.getUuid()) {
                        return v
                    }
                    const updateMessage =  m.getMessageInfo()?.toObject()
                    if(!updateMessage) {
                        return v
                    }
                    return updateMessage as MessageInfo
                }))
            } else if(type === "delete") {
                setMessages(prev => prev.filter(v => v.uuid !== m.getMessageInfo()?.getUuid()))
            } else if(type === "send") {
                const msgInfo = m.getMessageInfo()?.toObject()
                setMessages((prevMessages) => [...prevMessages, msgInfo as MessageInfo])
            }
        })

        return () => {
            connection.cancel()
        }

    }, [roomId])

    useEffect(() => {
        // refがnullの時はスキップ
            if(endDiv.current && scrollTop === 0) {
                endDiv.current?.scrollIntoView()
                setIsVisibility(true)
            } else {
                if (messageListParentRef.current) {
                    const newHeight = messageListParentRef.current.scrollHeight
                    messageListParentRef.current.scrollTop = newHeight - scrollTop;
                }

            }
    }, [messages, scrollTop])

    useEffect(() => {
        if (!hasMore) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadMore(messages)
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px', // ビューポートと要素のマージン
                threshold: 0,
            }
        );

        const currentMessageRef = messageRef.current

        if (currentMessageRef) {
            observer.observe(currentMessageRef)
        }
        return () => {
            if (currentMessageRef) {
                observer.unobserve(currentMessageRef)
            }
        }
    }, [hasMore, loadMore])

    return(
        <div className="MessageContentContainer" style={{visibility: isVisibility ? "visible" : "hidden"}} ref={messageListParentRef}>
                <div>
                    <div className="dmHeader">
                        <div>{initialMessages?.members?.join(", ")}</div>
                    </div>
                        <ul className="messageList" ref={messageListRef}>
                            {messages.map((v, i) => {
                                const match = v.content.match(regExp)
                                return (
                                <li key={i} className={i === 24 ? "yeah" : `${i}`} ref={i === 24 ? messageRef : null}>
                                    <Message id={v.id} uuid={v.uuid} content={v.content} timestamp={v.timestamp} user={v.user} inviteRoomId={match?.length ? match[1] : undefined} onUpdate={updateMessageHandler} onDelete={deleteMessageHandler} />
                                </li>
                                )
                            })}
                        </ul>
                    <div className="input">
                        <form onSubmit={submitMessageHandler}>
                            <input
                                name="message"
                                placeholder="メッセージを送信"
                                onChange={(e) => setSendMessage(e.target.value)}
                                value={sendMessage}
                            />
                            <button type="submit" className="inputButton">送信</button>
                        </form>
                    </div>
                    <div ref={endDiv}></div>
                </div>
        </div>
    )
}