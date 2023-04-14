export type tMember = {
    id: string,
    member: string,
    sites: string[]
}

export type tUser = {
    id: string,
    name: string,
    nickname: string,
    alias: string,
    email: string,
    password?: string,
    date: number,
    image: string,
    team: tMember[],
    greeting: string
}

export interface iTodos {
    id: string,
    user: string,
    date: number,
    description: string,
    done: boolean
}

export interface iNotes {
    id: string,
    user: string,
    date: number,
    title: string,
    description: string,
    type: string
}

export interface iAnswers {
    id: string,
    user: string,
    date: number,
    description: string,
    type: string
}

export interface iWebsites {
    id: string,
    user: string,
    site: string,
    key: string,
    hash: string,
    onlineUsers: string[],
    onlineUsersCounter: number
}

export interface iMessage {
    to: string
    from: string
    message: string
    date: number
}

export interface iMails extends iMessage {
    id: string,
    recipients: string[]
}

export interface iWebSocketMessage {
    [x: string]: iMessage | iMails
}

export interface iChatUserMessages {
    msgs: iMessage[]
    cnt: number
}

export interface iChat {
    [x: string]: iChatUserMessages
}

export interface iQuery {
    userId: string,
    offset?: number | string,
    num?: number | string
}
