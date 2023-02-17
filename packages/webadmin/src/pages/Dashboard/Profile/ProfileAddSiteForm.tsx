import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import bcrypt from 'bcryptjs-react';
import randomstring from 'randomstring';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { useAddWebsiteMutation, useEditWebsiteMutation } from 'store/api/websitesApi';
import { setServicesModal, setEditedSite, selectUIState, eModal } from "store/slices/ui";
import { withModalBG } from 'components/HOC';
import s from 'assets/style/forms.module.sass';

type tFormInputs = {
    siteName: string;
}

const Form = () => {
    const dispatch = useAppDispatch();
    const editedSite = useAppSelector(selectUIState('editedSite'));
    const [ addSite ] = useAddWebsiteMutation();
    const [ updateSite ] = useEditWebsiteMutation();
    const { setFocus, setValue, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('siteName', { shouldSelect: false });
    }, [setFocus]);

    useEffect(() => {
        // ✅ invoke when editing site
        if (editedSite && 'site' in editedSite) {
            setValue('siteName', editedSite.site);
        }
    }, [editedSite, setValue]);

    const onSubmit = async (formData: tFormInputs) => {
        // ✅ вызываем API '/websites', обновляем 'website'
        const key = randomstring.generate();
        const site = formData.siteName;
        const hash = await bcrypt.hashSync(key + site);

        if (formData.siteName) {
            if (!!editedSite && 'id' in editedSite) {
                // ✅ invoke when edit site
                updateSite({ id: editedSite.id, key, hash, site });
            } else {
                // ✅ invoke when add site
                addSite({ key, hash, site });
            }
            closeModal();
        }
    };

    const closeModal = () => {
        resetField('siteName');
        dispatch(setEditedSite(null));
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormBody}>
                <fieldset>
                    <label>Description</label>
                    <input
                        { ...register("siteName") }
                        className={s.FormInput}
                        placeholder="www.newsite.com" />
                </fieldset>
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                <input className={s.Button} type="submit" value={editedSite ? "Update site" : "Add new site"} />
            </div>
        </form>
    );
};

export const ProfileAddSiteForm = withModalBG(Form);
