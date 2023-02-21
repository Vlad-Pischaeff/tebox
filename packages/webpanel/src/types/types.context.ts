export interface iMessage {
    'from': string,
    'to': string,
    'message': string,
    'date': Date
}

export type iChat = Array<iMessage>

export interface iPropsWithChildren {
    children: React.ReactNode;
}
