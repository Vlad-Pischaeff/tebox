import React, { useState } from 'react';
import { UserIcons } from '@tebox/assets';
import { useChatContext } from 'store';
import s from 'styles/ManagerProfile.module.sass';

export const ManagerProfile = () => {
    const [ type, setType ] = useState('chat');
    const { mngProfile } = useChatContext();

    const Toggler = (event: React.MouseEvent) => {
        setType(event.currentTarget.id);
    }

    if (mngProfile) {
        return (
            <>
                <figure className={s.avatar}>
                    <img src={mngProfile.image} alt="avatar" />
                </figure>
                <div className={s.description}>
                    {mngProfile.alias ? mngProfile.alias : mngProfile.name}
                </div>
                <div className={s.menu}>
                    { type === 'chat'
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
