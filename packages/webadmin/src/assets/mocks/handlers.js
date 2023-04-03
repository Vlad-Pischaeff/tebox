import { rest } from 'msw';
import config from 'config';
import { log } from 'assets/utils';

const reqLoginUser = rest.post(`${config.URL}/api/users/login`, (req, res, ctx) => {
    const { name, password } = req.body;
    global.__TEST__ = { name, password };

    // log('handler -> reqLoginUser ->', global.__TEST__);

    return res(
        ctx.status(200),
        ctx.response({
            name,
            password
        })
    )
});

const reqSignupUser = rest.put(`${config.URL}/api/users/register`, (req, res, ctx) => {
    const { name, email, password } = req.body;
    global.__TEST__ = { name, email, password };

    // log('handler -> reqSignupUser ->', global.__TEST__);

    return res(
        ctx.status(200),
        ctx.response({
            name,
            email,
            password
        })
    )
});

const reqResetPassword = rest.post(`${config.URL}/api/users/reset`, (req, res, ctx) => {
    const { email } = req.body;
    global.__TEST__ = { email };

    // log('handler -> reqResetPassword ->', global.__TEST__);

    return res(
        ctx.status(200),
        ctx.response({
            email
        })
    )
});

const reqUpdateUser = rest.patch(`${config.URL}/api/users/:id`, (req, res, ctx) => {
    const { password } = req.body;
    const { id } = req.params;
    global.__TEST__ = { id, password };

    // log('handler -> reqUpdateUser ->', global.__TEST__);

    return res(
        ctx.status(200),
        ctx.response({
            id,
            password
        })
    )
});

const reqGetResult = rest.get(`/result`, (req, res, ctx) => {
    // log( 'handler 2 ->', global.__TEST__ );

    return res(
        ctx.status(200),
        ctx.json({
            ...global.__TEST__
        }),
    )
});

const reqClearResults = rest.get(`/clear`, (req, res, ctx) => {
    global.__TEST__ = {};
    // log( 'handler 3 ->', global.__TEST__ );

    return res(
        ctx.status(200),
        ctx.json({
            ...global.__TEST__
        }),
    )
});

export const handlers = [
    reqLoginUser,
    reqSignupUser,
    reqResetPassword,
    reqUpdateUser,
    reqGetResult,
    reqClearResults
]
