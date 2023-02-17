import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';
import { useUpdateTeamMemberWebsitesMutation, useGetUserQuery } from 'store/api/usersApi';
import { useWebsitesQuery } from 'store/api/websitesApi';
import { setServicesModal, setEditedMember, selectUIState, eModal } from "store/slices/ui";
import { withModalBG } from 'components/HOC';
import s from 'assets/style/forms.module.sass';
import sl from './Profile.module.sass';

type tFormInputs = {
    sites: string[];
}

const Form = () => {
    const dispatch = useAppDispatch();
    const member = useAppSelector(selectUIState('editedMember'));
    const user = useAppSelector(selectCurrentUser);
    const { data: owner } = useGetUserQuery(user.id, { skip: !user.id });
    const { data: sites } = useWebsitesQuery('');
    const [ updWebsites ] = useUpdateTeamMemberWebsitesMutation();
    const { setValue, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        if (member && 'id' in member) {
            const observedSites = owner?.team.filter((user) => {
                return user.member === member.id
            })

            if (observedSites) {
                setValue('sites', observedSites[0].sites );
            }
        }
        // eslint-disable-next-line
    }, [])

    const onSubmit = async (formData: tFormInputs) => {
        if (!!member && 'id' in member) {
            if (formData.sites.length !== 0) {
                const data = { memberID: member.id, sites: formData.sites }
                updWebsites({ body: data });
            }
            closeModal();
        }
    };

    const closeModal = () => {
        resetField('sites');
        dispatch(setEditedMember(null));
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormBody} role="listbox">
                <fieldset>
                    <label>Add/remove observed sites</label>
                    { !!sites && sites.length !== 0
                        ?   sites.map((site, idx) => (
                                <div key={site.id} className={sl.PropertyContainer} role="listitem">
                                    <p>{site.site}</p>
                                    <div className={sl.CheckboxContainer}>
                                        <input
                                            id={`cb-${idx}`}
                                            type="checkbox"
                                            value={site.id}
                                            { ...register('sites')} />
                                        <label htmlFor={`cb-${idx}`} className={sl.Checkbox} />
                                    </div>
                                </div>
                            ))
                        :   <div>
                                <p>You have no managed web-sites...</p>
                            </div>
                    }
                </fieldset>
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                <input className={s.Button} type="submit" value="Update sites" />
            </div>
        </form>
    );
};

export const ProfileTeamMemberSitesForm = withModalBG(Form);
