import { useEffect } from "react";
import { useManagerProfile } from "hooks/useManagerProfile";
import { useChatMessages } from "hooks/useChatMessages";
import { useMessageObject } from "hooks/useMessageObject";
import { iMngProfile } from "types/types.context";
import { iMSG, iWebSocketMessage, isMngProfile } from "types/types.context";
import { emitter } from "utils";

export const useChat = () => {
    const { mngProfile, setMngProfile } = useManagerProfile();
    const { chat, updChat, isMail, setIsMail } = useChatMessages();
    const { userId, serverId, setServerId, isSWReady, MSG } =
        useMessageObject();

    const ACT = {
        [iMSG.messageFromManager]: (data: iWebSocketMessage) => {
            console.log("8️⃣ iMSG.messageFromManager..", data);
            updChat(data[iMSG.messageFromManager]);
        },
        [iMSG.messageFromServer]: (data: iWebSocketMessage) => {
            console.log("7️⃣ iMSG.messageFromServer..", data);
            updChat(data[iMSG.messageFromServer]);
        },
        [iMSG.messageFromClient]: (data: iWebSocketMessage) => {
            console.log("5️⃣ iMSG.messageFromClient..", data);
            updChat(data[iMSG.messageFromClient]);
        },
        [iMSG.managerProfile]: (data: iWebSocketMessage) => {
            const { message } = data[iMSG.managerProfile];
            console.log("6️⃣ iMSG.managerProfile..", message);
            if (typeof message !== "string" && isMngProfile(message)) {
                setMngProfile(message as iMngProfile);

                // after receiving manager profile
                // substitute serverKey by manager.id
                // setServerId((message as iMngProfile).id);

                // add first message from manager to chat
                console.log("chat length...", chat);
                chat.length === 0 && addGreeting(message as iMngProfile);
            }
        },
        [iMSG.mailFromClient]: (data: iWebSocketMessage) => {
            console.log("4️⃣ iMSG.mailFromClient..", data);
        },
        [iMSG.registerClient]: (data: iWebSocketMessage) => {
            console.log("2️⃣ iMSG.registerClient..", data);
        },
        [iMSG.managerIsOnline]: (data: iWebSocketMessage) => {
            console.log("1️⃣ iMSG.managerIsOnline..");
        },
        [iMSG.clientIsOnline]: (data: iWebSocketMessage) => {
            console.log("0️⃣ iMSG.clientIsOnline..");
        },
        [iMSG.initWebSocket]: (data: iWebSocketMessage) => {
            console.log("3️⃣ iMSG.initWebSocket");
        },
        run: (data: iWebSocketMessage) => {
            const [key] = Object.keys(data) as iMSG[];
            ACT[key](data);
        },
    };

    // eslint-disable-next-line
    const runAction = (data: object) => {
        if ("detail" in data) {
            ACT.run(data?.detail as iWebSocketMessage);
        }
    };

    const addGreeting = (message: iMngProfile) => {
        const data = {
            to: userId,
            from: message.id,
            message: message.greeting,
            date: Date.now(),
        };
        updChat(data);
    };

    useEffect(() => {
        emitter.on("RUN_ACTION", runAction);
        return () => {
            emitter.off("RUN_ACTION", runAction);
        };
    }, [runAction]);

    return {
        chat,
        updChat,
        mngProfile,
        setMngProfile,
        userId,
        serverId,
        setServerId,
        isMail,
        setIsMail,
        isSWReady,
        MSG,
    };
};
