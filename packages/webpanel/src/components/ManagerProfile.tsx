import React from 'react';
import { UserIcons } from '@tebox/assets';
import { useChatContext } from 'store';
import s from 'styles/ManagerProfile.module.sass';

export const ManagerProfile = () => {
    const { mngProfile, msgType, setMsgType, SW } = useChatContext();

    const Toggler = (event: React.MouseEvent) => {
        setMsgType(event.currentTarget.id);
    }

    if (mngProfile) {
        return (
            <>
                <figure className={s.avatar}>
                    <img src={mngProfile.image} alt="avatar" />
                </figure>
                <div className={s.description}>
                    {mngProfile.alias ? mngProfile.alias : mngProfile.name}
                    <div>Service Worker {SW?.state}</div>
                </div>
                <div className={s.menu}>
                    { msgType === 'chat'
                        ?   <div id="mail" className={s.menuItem} onClick={Toggler}>
                                <img src={UserIcons.SVG.mail} alt="mail" />
                            </div>
                        :   <div id="chat" className={s.menuItem} onClick={Toggler}>
                                <img src={UserIcons.SVG.chat} alt="chat" />
                            </div>
                    }
                </div>
            </>
        )
    } else {
        return (
            <div className={s.loader}>Loading manager profile...</div>
        )
    }
};
