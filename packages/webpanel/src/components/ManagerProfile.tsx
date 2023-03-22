import React from 'react';
import { UserIcons } from '@tebox/assets';
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
                    :   <img src={UserIcons.SVG.userfemale} alt="user" className={s.gray}/>
                }
                {/* for testing purpose */}
                <div className={`${s.descriptionSw} ${isSWReady ? s.lb : s.lc}`}></div>
                {/* for testing purpose */}
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
                        ?   <img src={UserIcons.SVG.chat} alt="chat" />
                        :   <img src={UserIcons.SVG.mail} alt="mail" />
                    }
                </div>
            </div>
        </>
    );
};
