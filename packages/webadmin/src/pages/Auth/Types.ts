export type tFormInputs = {
    name: string;
    password: string;
    email?: string;
}

export type tFormPasswords = {
    newpassword: string;
    repeatpassword: string;
}

export type tWarning = {
    name?: string;
    errors?: string | Array<string>;
    message?: string;
}

export const enum InputType {
    pw = "password",
    txt = "text",
}
