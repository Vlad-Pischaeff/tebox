interface iMessage {
    'from': string,
    'to': string,
    'message': string,
    'date': Date
}

export type iChat = Array<iMessage>

export interface iContext {
    chat: iChat,
    setChat: React.Dispatch<React.SetStateAction<iChat>>,
    updateChat?: (id: number) => void,
}

export interface iPropsWithChildren {
    children: React.ReactNode;
}
