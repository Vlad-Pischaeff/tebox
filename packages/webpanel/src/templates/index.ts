import randomstring from 'randomstring';
import { iChat } from 'types/types.context';

export const USER_ID = () => {
    let userId = sessionStorage.getItem('userId');

    if (!userId) {
        userId = randomstring.generate();
        sessionStorage.setItem('userId', userId);
    }

    return userId;
}

export const SERVER_ID = randomstring.generate();

export const chatMock: iChat = [
    {
        'from': USER_ID(),
        'to': SERVER_ID,
        'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        'date': new Date(2011, 1, 19),
    },
    {
        'from': USER_ID(),
        'to': SERVER_ID,
        'message': 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        'date': new Date(2011, 1, 19),
    },
    {
        'from': SERVER_ID,
        'to': USER_ID(),
        'message': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        'date': new Date(2011, 1, 21),
    },
    {
        'from': SERVER_ID,
        'to': USER_ID(),
        'message': 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        'date': new Date(2011, 1, 21),
    },
    {
        'from': SERVER_ID,
        'to': USER_ID(),
        'message': 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut',
        'date': new Date(2011, 1, 21),
    },
    {
        'from': USER_ID(),
        'to': SERVER_ID,
        'message': 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt',
        'date': new Date(2011, 1, 28),
    },
    {
        'from': SERVER_ID,
        'to': USER_ID(),
        'message': 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
        'date': new Date(2023, 1, 15, 7, 0, 15),
    },
    {
        'from': USER_ID(),
        'to': SERVER_ID,
        'message': 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt',
        'date': new Date(2023, 1, 21, 15, 21, 35),
    },
    {
        'from': USER_ID(),
        'to': SERVER_ID,
        'message': 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt',
        'date': new Date(2023, 1, 22, 9, 20, 48),
    },
];
