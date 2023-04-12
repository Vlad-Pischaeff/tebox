import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, setEditedMember, eModal } from 'store/slices/ui';
import { useGetUserQuery, useRemoveUserTeamMembersMutation } from 'store/api/usersApi';
import { useWebsitesQuery } from 'store/api/websitesApi';
import { tMember } from 'store/api/apiTypes';
import * as ICON from 'assets/icons';
import s from './Profile.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    user: tMember
}

export const ProfileTeamMember = ({ user }: iProps ) => {
    const dispatch = useAppDispatch();
    const { data: sites } = useWebsitesQuery();
    const { data: member } = useGetUserQuery(user.member, { skip: !user.member });
    const [ removeUser ] = useRemoveUserTeamMembersMutation();

    const editMemberSites = () => {
        !!member && dispatch(setEditedMember(member));
        dispatch(setServicesModal(eModal.editMemberSites));
    }

    const removeFromTeam = () => {
        if (member) {
            removeUser({ body: { memberID: member.id }});
        }
    }

    const isInList = (id: string) => {
        return (user.sites as string[]).includes(id);
    }

    const SITES = sites?.filter((site) => isInList(site.id));

    return (
        <>
            { !!member &&
                <div className={s.PropertyContainer} style={{ 'padding': '8px' }}>
                    <div className={`${s.PropertyFlexRow} ${s.flex11}`}>
                        <div className={s.PropertyMemberIcon}>
                            { !!member.image
                                ?   <img src={member.image} alt="avatar" />
                                :   <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 50 50">
                                        <g>
                                            <path d="M26.05273,3.0918c-0.02543,0.00033 -0.05084,0.00164 -0.07617,0.00391c-4.04706,0.30622 -6.82983,1.95146 -8.5625,4.2793c-1.73267,2.32784 -2.44738,5.23831 -2.78516,8.12305c-0.33777,2.88474 -0.29485,5.77554 -0.38867,8.08398c-0.04691,1.15422 -0.12915,2.16251 -0.28711,2.91406c-0.15796,0.75155 -0.40441,1.19939 -0.58008,1.35547c-0.21376,0.18987 -0.33603,0.46214 -0.33594,0.74805c0,0.70589 0.38611,1.35931 0.88477,1.7793c0.49866,0.41998 1.1052,0.69428 1.80859,0.92578c1.15672,0.3807 2.75411,0.58866 4.41797,0.79492c-0.0045,0.05444 -0.0065,0.08035 -0.01172,0.14063c-0.32259,0.78868 -1.09703,1.4363 -2.33203,2.05273c-1.26928,0.63355 -2.9218,1.19435 -4.5918,1.91211c-1.66999,0.71776 -3.37514,1.59701 -4.73438,2.97266c-1.35924,1.37565 -2.32701,3.27356 -2.47656,5.76172c-0.01666,0.2752 0.08102,0.54506 0.26996,0.74584c0.18894,0.20078 0.45239,0.31465 0.72809,0.31471h38c0.2757,-0.00006 0.53914,-0.11393 0.72809,-0.31471c0.18894,-0.20078 0.28662,-0.47064 0.26996,-0.74584c-0.14922,-2.48723 -1.1128,-4.38383 -2.4668,-5.75977c-1.354,-1.37593 -3.05311,-2.25671 -4.7168,-2.97461c-1.66368,-0.7179 -3.30781,-1.27874 -4.57227,-1.91211c-1.22641,-0.61431 -1.99736,-1.25834 -2.32227,-2.04492c-0.0027,-0.03849 -0.00326,-0.10421 -0.00586,-0.14844c1.76319,-0.23883 3.44495,-0.52636 4.63086,-0.97266c0.71325,-0.26842 1.30792,-0.56297 1.78906,-0.94531c0.48114,-0.38234 0.92188,-0.92609 0.92188,-1.65039c-0.00058,-0.28325 -0.12124,-0.55297 -0.33203,-0.74219c-0.12974,-0.11692 -0.37392,-0.56151 -0.52148,-1.31055c-0.14757,-0.74904 -0.22228,-1.75794 -0.25391,-2.91016c-0.06325,-2.30442 0.03871,-5.18144 -0.11523,-8c-0.1539,-2.81856 -0.54072,-5.59343 -1.74609,-7.77539c-1.16282,-2.10492 -3.28366,-3.54063 -6.23633,-3.53711c-0.93036,-0.66001 -2.22637,-1.16406 -3.99805,-1.16406zM26.0957,5.09766c1.55061,0.01037 2.55375,0.47827 3.04102,0.89063c0.1904,0.1613 0.43422,0.24559 0.68359,0.23633c2.51913,-0.09417 3.78264,0.84415 4.7168,2.53516c0.93416,1.69101 1.35086,4.2212 1.49805,6.91602c0.14718,2.69481 0.04725,5.54147 0.11328,7.94727c0.03301,1.2029 0.10442,2.29507 0.29102,3.24219c0.12867,0.6531 0.35612,1.22377 0.67383,1.73828c-0.02127,0.01956 0.0081,-0.01336 -0.02344,0.01172c-0.22408,0.17807 -0.65892,0.41892 -1.24805,0.64063c-1.17825,0.44341 -2.96104,0.83622 -5.07031,1.05273c-0.52214,0.05311 -0.9144,0.5008 -0.89844,1.02539c0.0152,0.48328 0.03372,0.94593 0.06445,1.28516c0.00804,0.08815 0.02774,0.17485 0.05859,0.25781c0.57084,1.53495 1.8974,2.47571 3.34961,3.20313c1.4522,0.72741 3.11179,1.28717 4.67773,1.96289c1.56594,0.67572 3.02112,1.46096 4.08203,2.53906c0.845,0.85869 1.37319,1.99707 1.6543,3.41797h-35.51758c0.28205,-1.41973 0.81169,-2.55731 1.66016,-3.41602c1.06551,-1.07838 2.5271,-1.86515 4.09961,-2.54102c1.57251,-0.67586 3.23834,-1.23371 4.69531,-1.96094c1.45697,-0.72723 2.78798,-1.66864 3.35938,-3.20508c0.03085,-0.08297 0.05056,-0.16966 0.05859,-0.25781c0.05578,-0.6095 0.08274,-0.98639 0.0957,-1.30078c0.02147,-0.52625 -0.36889,-0.97897 -0.89258,-1.03516c-2.08349,-0.22568 -3.83793,-0.50866 -4.96289,-0.87891c-0.56248,-0.18512 -0.95942,-0.39714 -1.14649,-0.55469c-0.07784,-0.06556 -0.04885,-0.07251 -0.07226,-0.10352c0.36641,-0.53872 0.62794,-1.14561 0.77344,-1.83789c0.20067,-0.95476 0.28136,-2.04548 0.33008,-3.24414c0.09743,-2.39731 0.05777,-5.22433 0.375,-7.93359c0.31723,-2.70926 0.99526,-5.26974 2.40234,-7.16016c1.40207,-1.88368 3.5031,-3.19393 7.07813,-3.47266z"></path>
                                        </g>
                                    </svg>
                            }
                        </div>

                        <div>
                            <div className={s.PropertySite}>{member.name}</div>
                            <div className={s.PropertyTitle}>{member.email}</div>
                            <div className={s.PropertyTitle}>{member.alias}</div>
                        </div>
                    </div>

                    <div className={s.PropertyHash} role="listbox">
                        { !!SITES && (
                            SITES.length === 0
                                ?   <div className={s.PropertyTitle}>
                                        <p>No observed sites...</p>
                                    </div>
                                :   SITES.map((site) => (
                                        <div key={site.id} role="listitem">
                                            {site.site}
                                        </div>
                                    ))
                        )}
                    </div>

                    <div className={s.PropertyFlexRow}>
                        <div
                            className={s.PropertyIcon}
                            onClick={editMemberSites}
                        >
                            <ICON.EditIcon />
                        </div>
                        <div
                            className={s.PropertyIcon}
                            onClick={removeFromTeam}
                        >
                            <ICON.TrashIcon />
                        </div>
                    </div>

                </div>
            }
        </>
    );
};
