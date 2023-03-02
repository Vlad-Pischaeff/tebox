export interface iMessage {
    'from': string,
    'to': string,
    'message': string,
    'date': number
}

export type iChat = Array<iMessage>

export interface iPropsWithChildren {
    children: React.ReactNode;
}

export interface iWebSocketMessage {
    [x: string]: iMessage
}

export enum iWS {
    'registerClient' = 'REGISTER CLIENT',
    'messageFromClient' = 'MSG FROM CLIENT',
    'messageFromManager' = 'MSG FROM MANAGER',
    'managerIsOnline' = 'MANAGER IS ONLINE',
    'clientIsOnline' = 'CLIENT IS ONLINE',
}
