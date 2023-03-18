import randomstring from 'randomstring';
import { iChat, iSessionHandler, iMngProfile } from 'types/types.context';

export const SS: iSessionHandler = {
    Session: {
        userId: '',
    },
    getSession() {
        const str = localStorage.getItem('tebox');
        if (str !== null) {
            SS.Session = JSON.parse(str);
        }
    },
    saveSession() {
        localStorage.setItem('tebox', JSON.stringify(SS.Session));
    },
    getUserID(): string {
        SS.getSession();

        if (!SS.Session.userId) {
            SS.Session.userId = randomstring.generate();
            SS.saveSession();
        }
        return SS.Session.userId;
    },
    getMngProfile(): iMngProfile | undefined {
        SS.getSession();
        return SS.Session.mngProfile;
    },
    saveMngProfile(profile: iMngProfile) {
        SS.getSession();
        SS.Session.mngProfile = profile;
        SS.saveSession();
    }
};

export const USER_ID = SS.getUserID();
// export const SERVER_ID = '7ra/HQmh1y9wZ3WPUsAZiOKoynPQ7xDZ2v8NFEav9zpJPW.3ziQL6';
export const SERVER_ID = 'yYtD3RH9VqUANPeZd2TPa.GLYAtU4JngX04uH4Ob0UAynufikmUhm';
export const chatMock: iChat = [
    {
        'from': USER_ID,
        'to': SERVER_ID,
        'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        'date': new Date(2011, 1, 19).getTime(),
    },
    {
        'from': USER_ID,
        'to': SERVER_ID,
        'message': 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        'date': new Date(2011, 1, 19).getTime(),
    },
    {
        'from': SERVER_ID,
        'to': USER_ID,
        'message': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        'date': new Date(2011, 1, 21).getTime(),
    },
    {
        'from': SERVER_ID,
        'to': USER_ID,
        'message': 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        'date': new Date(2011, 1, 21).getTime(),
    },
    {
        'from': SERVER_ID,
        'to': USER_ID,
        'message': 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut',
        'date': new Date(2011, 1, 21).getTime(),
    },
    {
        'from': USER_ID,
        'to': SERVER_ID,
        'message': 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt',
        'date': new Date(2011, 1, 28).getTime(),
    },
    {
        'from': SERVER_ID,
        'to': USER_ID,
        'message': 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
        'date': new Date(2023, 1, 15, 7, 0, 15).getTime(),
    },
    {
        'from': USER_ID,
        'to': SERVER_ID,
        'message': 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt',
        'date': new Date(2023, 1, 21, 15, 21, 35).getTime(),
    },
    {
        'from': USER_ID,
        'to': SERVER_ID,
        'message': 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt',
        'date': new Date(2023, 1, 22, 9, 20, 48).getTime(),
    },
];
