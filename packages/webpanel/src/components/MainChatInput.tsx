import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonSendMessage } from './ButtonSendMessage';
import s from 'styles/MainChatInput.module.sass';

type tFormInputs = {
    message: string;
}

export const MainChatInput = () => {
    const { setFocus, setValue, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('message', { shouldSelect: false });
    }, [setFocus]);

    useEffect(() => {
        // ✅ invoke when editing site
        // if (editedSite && 'site' in editedSite) {
        //     setValue('siteName', editedSite.site);
        // }
    }, [setValue]);

    const onSubmit = async (formData: tFormInputs) => {
        // ✅ вызываем API '/websites', обновляем 'website'
        // const key = randomstring.generate();
        // const site = formData.siteName;
        // const hash = await bcrypt.hashSync(key + site);
        console.log('✅ Submit...')
        if (formData.message) {
        //     if (!!editedSite && 'id' in editedSite) {
        //         // ✅ invoke when edit site
        //         updateSite({ id: editedSite.id, key, hash, site });
        //     } else {
        //         // ✅ invoke when add site
        //         addSite({ key, hash, site });
            // }
            clearInput();
        }
    };

    const clearInput = () => {
        resetField('message');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div>
                <input
                    { ...register("message") }
                    className={s.FormInput}
                    placeholder="type your message here..." />
            </div>
            <div className={s.FormButtons}>
                <ButtonSendMessage />
            </div>
        </form>
    );
};
