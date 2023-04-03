import { createSlice, PayloadAction, isAnyOf  } from '@reduxjs/toolkit';
import { usersApi } from 'store/api/usersApi';
import { todosApi } from 'store/api/todosApi';
import { notesApi } from 'store/api/notesApi';
import { answersApi } from 'store/api/answersApi';
import { websitesApi } from 'store/api/websitesApi';
import { tTheme } from 'assets/style/utils';
import { tUser, iNotes, iAnswers, iWebsites } from 'store/api/apiTypes';
import { tServiceMenu } from 'pages/Dashboard/MainChat/Services/ServicesVariables';
import type { RootState } from 'store/store';

export interface iItemServiceMenu {
    noteActions?: string | false,
    noteMark?: string | false,
    notesFilter?: string | false,
    answerActions?: string | false,
    answerMark?: string | false,
    answersFilter?: string | false,
}

export enum eModal {
    todo = 'TODO',
    note = 'NOTE',
    mail = 'MAIL',
    answer = 'ANSWER',
    editor = 'EDITOR',
    addSite = 'ADD_SITE',
    changeImage = 'CHANGE_IMAGE',
    changeAlias = 'CHANGE_ALIAS',
    changeGreeting = 'CHANGE_GREETING',
    addMember = 'ADD_MEMBER',
    editMemberSites = 'EDIT_MEMBER_SITES',
    pickEmoji = "PICK_EMOJI",
    none = 'NONE'
}

export type UIType = {
    theme: tTheme;
    message: string;
    type: 'error' | 'warning' | 'info';  // ❎✍⌛ TODO use for styling SnackBar
    services: tServiceMenu;
    servicesModal: eModal;
    editedNote: iNotes | null;
    editedAnswer: iAnswers | null;
    editedSite: iWebsites | null;
    editedImage: string;
    editedMember: tUser | null;          // м.б. использовать только ID
    serviceMenu: iItemServiceMenu;
    notesFilterColor: string;
    answersFilterIcon: string;
    hiddenPanelServices: boolean;
    emoji: string;
}

export type UIKeys = keyof UIType;

const initialState: UIType = {
    theme: 'dark',
    message: '',
    type: 'info',
    services: 'Todos',
    servicesModal: eModal.none,
    editedNote: null,
    editedAnswer: null,
    editedSite: null,
    editedImage: '',
    editedMember: null,
    serviceMenu: {
        noteActions: false,
        noteMark: false,
        notesFilter: false,
        answerActions: false,
        answerMark: false,
        answersFilter: false,
    },
    notesFilterColor: 'none',
    answersFilterIcon: 'none',
    hiddenPanelServices: false,
    emoji: ''
}

const slice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = '';
        },
        setMessage: (state, { payload }: PayloadAction<string>) => {
            state.message = payload;
        },
        setTheme: (state, { payload }: PayloadAction<tTheme>) => {
            state.theme = payload;
        },
        setServiceMenuCategory: (state, { payload }: PayloadAction<tServiceMenu>) => {
            state.services = payload;
        },
        setServicesModal: (state, { payload }: PayloadAction<eModal>) => {
            state.servicesModal = payload;
        },
        setEditedNote: (state, { payload }: PayloadAction<iNotes | null>) => {
            state.editedNote = payload;
        },
        setEditedAnswer: (state, { payload }: PayloadAction<iAnswers | null>) => {
            state.editedAnswer = payload;
        },
        setEditedSite: (state, { payload }: PayloadAction<iWebsites | null>) => {
            state.editedSite = payload;
        },
        setEditedImage: (state, { payload }: PayloadAction<string>) => {
            state.editedImage = payload;
        },
        setEditedMember: (state, { payload }: PayloadAction<tUser | null>) => {
            state.editedMember = payload;
        },
        setItemServiceMenu: (state, { payload }: PayloadAction<iItemServiceMenu | null>) => {
            const obj = { ...state.serviceMenu };
            // ✅ reset all properties to "false"
            (Object.keys(obj) as (keyof typeof obj)[]).forEach(key => {
                state.serviceMenu[key] = false;
            })
            // ✅ if "payload" not "null" => set property
            if (payload !== null) {
                state.serviceMenu = { ...state.serviceMenu, ...payload };
            }
        },
        setNotesFilterColor: (state, { payload }: PayloadAction<string>) => {
            state.notesFilterColor = payload;
        },
        setAnswersFilterIcon: (state, { payload }: PayloadAction<string>) => {
            state.answersFilterIcon = payload;
        },
        setHiddenPanelServices: (state, { payload }: PayloadAction<boolean>) => {
            state.hiddenPanelServices = payload;
        },
        setEmoji: (state, { payload }: PayloadAction<string>) => {
            state.emoji = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher( isAnyOf(
                usersApi.endpoints.loginUser.matchRejected,
                usersApi.endpoints.addUser.matchRejected,
                usersApi.endpoints.updateUser.matchRejected,
                usersApi.endpoints.resetUserPassword.matchRejected,
                usersApi.endpoints.getUserIdFromToken.matchRejected,
                usersApi.endpoints.addUserTeamMembers.matchRejected,
                usersApi.endpoints.updateTeamMemberWebsites.matchRejected,
                todosApi.endpoints.getTodo.matchRejected,
                todosApi.endpoints.addTodo.matchRejected,
                todosApi.endpoints.deleteTodo.matchRejected,
                todosApi.endpoints.editTodo.matchRejected,
                notesApi.endpoints.deleteNote.matchRejected,
                notesApi.endpoints.editNote.matchRejected,
                answersApi.endpoints.deleteAnswer.matchRejected,
                answersApi.endpoints.editAnswer.matchRejected,
                websitesApi.endpoints.deleteWebsite.matchRejected,
                websitesApi.endpoints.editWebsite.matchRejected,
            ),
            (state, { payload } ) => {
                if (payload && 'data' in payload) {
                    const { message } = payload.data as UIType;
                    state.message = message;
                    state.type = 'error';
                }
            },
        )
        builder.addMatcher( isAnyOf(
                usersApi.endpoints.resetUserPassword.matchFulfilled,
                todosApi.endpoints.deleteTodo.matchFulfilled,
                notesApi.endpoints.deleteNote.matchFulfilled,
                answersApi.endpoints.deleteAnswer.matchFulfilled,
                websitesApi.endpoints.deleteWebsite.matchFulfilled,
            ),
            (state, { payload } ) => {
                if (payload && 'message' in payload) {
                    const { message } = payload;
                    state.message = message;
                    state.type = 'info';
                }
            },
        )
    },
});

export const {
    resetMessage,
    setMessage,
    setTheme,
    setServiceMenuCategory,
    setServicesModal,
    setEditedNote,
    setEditedAnswer,
    setEditedSite,
    setEditedImage,
    setEditedMember,
    setItemServiceMenu,
    setNotesFilterColor,
    setAnswersFilterIcon,
    setHiddenPanelServices,
    setEmoji
} = slice.actions;

export default slice.reducer;

// ✅ To be used as a universal replacement for state properties selectors
export function selectUIState<T extends UIKeys>(arg: T) {
    return function (state: RootState) {
        return state.ui[arg];
    }
}

export const selectUI = (state: RootState) => state.ui;

// ✅ interchanged with a universal selector
// export const selectUITheme = (state: RootState) => state.ui.theme;
// export const selectUIMessage = (state: RootState) => state.ui.message;

// export const selectUIServices = (state: RootState) => state.ui.services;
// export const selectUIServicesModal = (state: RootState) => state.ui.servicesModal;
// export const selectUIServiceMenu = (state: RootState) => state.ui.serviceMenu;

// export const selectUIEditedNote = (state: RootState) => state.ui.editedNote;
// export const selectUIEditedAnswer = (state: RootState) => state.ui.editedAnswer;

// export const selectUIEditedSite = (state: RootState) => state.ui.editedSite;
// export const selectUIEditedImage = (state: RootState) => state.ui.editedImage;
// export const selectUIEditedMember = (state: RootState) => state.ui.editedMember;

// export const selectUIAnswersFilterIcon = (state: RootState) => state.ui.answersFilterIcon;
// export const selectUINotesFilterColor = (state: RootState) => state.ui.notesFilterColor;

// export const selectUIHiddenPanelServices = (state: RootState) => state.ui.hiddenPanelServices;
