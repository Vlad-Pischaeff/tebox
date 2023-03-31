import React from 'react';
import { userfemale, chat, mail } from '@tebox/assets/icons/svg';
import { useChatContext } from 'store';
import s from 'styles/ManagerProfile.module.sass';

export const ManagerProfile = () => {
    // eslint-disable-next-line
    const { mngProfile, isMail, setIsMail, isSWReady } = useChatContext();

    const handleToggle = () => {
        setIsMail(!isMail);
    }

    return (
        <>
            <figure className={s.avatar}>
                { !!mngProfile
                    ?   <img src={mngProfile.image} alt="avatar" />
                    :   <img src={userfemale} alt="user" className={s.gray}/>
                }
                <div className={`${s.descriptionSw} ${isSWReady ? s.lb : s.lc}`}></div>
            </figure>

            <div className={s.description}>
                { !!mngProfile
                    ?   (mngProfile.alias || mngProfile.name)
                    :   'Loading profile...'
                }
            </div>

            <div className={s.menu} onClick={handleToggle}>
                <div className={s.menuItem}>
                    { isMail
                        ?   <img src={chat} alt="chat" />
                        :   <img src={mail} alt="mail" />
                    }
                </div>
            </div>
        </>
    );
};
