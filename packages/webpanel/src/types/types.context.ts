export interface iMessage {
    'from': string,
    'to': string,
    'message': string | iMngProfile,
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
    'messageFromManager' = 'MSG_FROM_MANAGER',
    'managerIsOnline' = 'MANAGER_IS_ONLINE',
    'managerProfile' = 'MANAGER_PROFILE',
    'clientIsOnline' = 'CLIENT_IS_ONLINE',
    'initWebSocket' = 'INIT_WS',
}

export interface iMngProfile {
    id: string,
    name: string,
    alias: string,
    image: string,
    greeting: string
}

export const isMngProfile = (obj: iMngProfile): boolean => {
    if (
        obj.id !== undefined &&
        obj.name !== undefined &&
        obj.alias !== undefined &&
        obj.image !== undefined &&
        obj.greeting !== undefined
    ) {
        return true
    } else {
        return false
    }
}
