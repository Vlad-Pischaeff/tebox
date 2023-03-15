export interface iMessage {
    'from': string,
    'to': string,
    'message': string | iMngProfile | iMail,
    'date': number
}

export type iChat = Array<iMessage>

export interface iPropsWithChildren {
    children: React.ReactNode;
}

export interface iWebSocketMessage {
    [x: string]: iMessage
}

export enum iMSG {
    'registerClient' = 'REGISTER_CLIENT',
    'messageFromClient' = 'MSG_FROM_CLIENT',
    'mailFromClient' = 'MAIL_FROM_CLIENT',
    'messageFromManager' = 'MSG_FROM_MANAGER',
    'managerIsOnline' = 'MANAGER_IS_ONLINE',
    'managerProfile' = 'MANAGER_PROFILE',
    'clientIsOnline' = 'CLIENT_IS_ONLINE',
    'initWebSocket' = 'INIT_WS',
}

export interface iMail {
    mailFrom: string,
    message: string
}

export interface iMngProfile {
    id: string,
    name: string,
    alias: string,
    image: string,
    greeting: string
}

export const isMngProfile = (obj: object): boolean => {
    if (
        ('id' in obj)       &&
        ('name' in obj)     &&
        ('alias' in obj)    &&
        ('image' in obj)    &&
        ('greeting' in obj)
    ) {
        return true
    } else {
        return false
    }
}

interface iSession {
    'userId'?: string,
    'mngProfile'?: iMngProfile | undefined
}

export interface iSessionHandler {
    Session: iSession,
    getSession: () => void,
    saveSession: () => void,
    getUserID: () => string,
    getMngProfile: () => iMngProfile | undefined,
    saveMngProfile: (profile: iMngProfile) => void
}
