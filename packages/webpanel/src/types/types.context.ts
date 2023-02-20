interface iMessage {
    'message': string,
    'date': string
}

export interface iManager extends iMessage {
    'manager': string,
}

export interface iClient extends iMessage{
    'client': string,
}

export type iChat = Array<iManager | iChat>

export interface iContext {
    chat: iChat,
    setChat: React.Dispatch<React.SetStateAction<iChat>>,
    updateChat?: (id: number) => void,
}

export interface iPropsWithChildren {
    children: React.ReactNode;
}
