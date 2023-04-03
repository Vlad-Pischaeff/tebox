import React from 'react';
import EmojiPicker, {
    EmojiStyle,
    SkinTones,
    Theme,
    EmojiClickData,
    SuggestionMode,
} from "emoji-picker-react";
import { useAppDispatch } from 'store/hook';
import { setServicesModal, setEmoji, eModal } from "store/slices/ui";
import { withModalBG } from 'components/HOC';
import s from 'assets/style/forms.module.sass';

const Form = () => {
    const dispatch = useAppDispatch();

    const onClick = (emojiData: EmojiClickData, event: MouseEvent) => {
        dispatch(setEmoji(emojiData.emoji));
        closeModal();
    }

    const closeModal = () => {
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <form className={s.Form}>
            <div className={s.FormBody}>
                <EmojiPicker
                    onEmojiClick={onClick}
                    autoFocusSearch={false}
                    theme={Theme.AUTO}
                    emojiVersion="0.6"
                    lazyLoadEmojis={true}
                    suggestedEmojisMode={SuggestionMode.RECENT}
                    skinTonesDisabled
                    defaultSkinTone={SkinTones.MEDIUM}
                    emojiStyle={EmojiStyle.NATIVE}
                />
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Cancel" onClick={closeModal} />
            </div>
        </form>
    );
};

export const ChatPickEmojiForm = withModalBG(Form);
