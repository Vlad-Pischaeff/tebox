'use strict';

const config = require('@tebox/config/server');
const Users = require('#s/models/users');
const UserService = require('#s/services/userService');
const MailService = require('#s/services/mailService');
const TokenService = require('#s/services/tokenService');
const UserDTO = require('#s/dtos/userDTO');
const {
    fillAnswersTemplates,
    fillNotesTemplates,
    fillTodosTemplates,
    // fillWebTemplates         // use for development
} = require('#s/templates/index');
const { HELPER } = require('#s/helpers/index');

const usersController = () => {
    /** ******************************************
     * get all users
     ****************************************** */
    const getUsers = async (req, res) => {
        try {
            const users = await Users.find();

            res.status(201).json(users);
        } catch (e) {
            res.status(500).json({ message: `Something wrong, details... ${e.message}` });
        }
    };
    /** ******************************************
     * register new user
     ****************************************** */
    const registerUser = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const userData = await UserService.registerUser(name, email, password);
            const { refreshToken, accessToken, id } = userData;

            await fillAnswersTemplates(id); // add answers templates to new user
            await fillNotesTemplates(id);   // add notes templates to new user
            await fillTodosTemplates(id);   // add todos templates to new user

            res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json({ accessToken, id });
        } catch (e) {
            res.status(500).json({ message: `Register error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * login user
     ****************************************** */
    const loginUser = async (req, res) => {
        try {
            const { name, password } = req.body;
            const userData = await UserService.loginUser(name, password);
            const { refreshToken, accessToken, id } = userData;

            // await fillWebTemplates(id);          // use for development
            await HELPER.runWebSitesHashReduce();

            res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json({ accessToken, id });
        } catch (e) {
            res.status(500).json({ message: `Login error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * logout user
     ****************************************** */
    const logoutUser = async (req, res) => {
        try {
            const { refreshToken } = req.cookies;
            const token = await UserService.logoutUser(refreshToken);

            res.clearCookie('refreshToken');
            res.json({ token });
        } catch (e) {
            res.status(500).json({ message: `Logout error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * update user - host/api/users/637dafa8efa9a1b203f5f6d1
     * @param {string} id - user ID
     ****************************************** */
    const updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            await Users.findByIdAndUpdate(id, req.body);
            const newUser = await Users.findOne({ _id: id });

            await HELPER.runWebSitesHashReduce();

            res.status(201).json(newUser);
        } catch (e) {
            res.status(500).json({ message: `Update user error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * add member to user's team - host/api/users/team
     ****************************************** */
    const addMemberToUserTeam = async (req, res) => {
        try {
            const userID = req.id;
            const { nickname } = req.body;

            const newMember = await Users.findOne({ nickname });

            const updatedUser = await UserService.checkUserBeforUpdateTeam(newMember.id, userID);

            if ('checkError' in updatedUser) {
                throw new Error(updatedUser.checkError);
            }

            await HELPER.runWebSitesHashReduce();

            res.status(201).json(updatedUser);
        } catch (e) {
            res.status(500).json({ message: `Update user team error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * add member to user's team - host/api/users/team
     ****************************************** */
    const removeMemberFromUserTeam = async (req, res) => {
        try {
            const userID = req.id;
            const { memberID } = req.body;

            await Users.updateOne(
                { _id: userID },
                { $pull: {
                    'team': {
                            'member': memberID
                        }
                    }
                }
            );

            await HELPER.runWebSitesHashReduce();

            const owner = await Users.findOne({ _id: userID });

            res.status(201).json(owner);
        } catch (e) {
            res.status(500).json({ message: `Remove user from team error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * update member websites - host/api/users/team/member/websites
     ****************************************** */
    const updTeamMemberWebsites = async (req, res) => {
        try {
            const userID = req.id;
            const { memberID, sites } = req.body;

            await Users.updateOne(
                { _id: userID, 'team.member': memberID },
                { $set: {
                        'team.$.sites': sites
                    }
                }
            );

            await HELPER.runWebSitesHashReduce();

            const newUser = await Users.findOne({ _id: userID });

            res.status(201).json(newUser);
        } catch (e) {
            res.status(500).json({ message: `Update user team member websites error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get users exclude single user
     ****************************************** */
    const getExcludeUser = async (req, res) => {
        try {
            const { id } = req.params;
            const users = await Users.find({ _id: { $ne: id } });

            res.status(201).json(users);
        } catch (e) {
            res.status(500).json({ message: `Get exclude user error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get single user
     ****************************************** */
    const getUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Users.findOne({ _id: id });

            res.status(201).json(user);
        } catch (e) {
            res.status(500).json({ message: `Get user error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * refresh refreshToken
     ****************************************** */
    const refreshToken = async (req, res) => {
        try {
            const { refreshToken: token } = req.cookies;
            const userData = await UserService.refreshToken(token);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json(userData);
        } catch (e) {
            res.status(500).json({ message: `Refresh token error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * reset user's password
     * 1. find user email in db
     * 2. if email exists then generate token with liftime 10m
     * 3. send link to user
     ****************************************** */
    const resetPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const user = await Users.findOne({ email });

            // send email only if email existed
            if (user) {
                const userDTO = new UserDTO(user);          // ⚠️ it is extra code, should be removed
                const accessToken = TokenService.generateToken({ ...userDTO }, 'ACCESS', config.LIFETIME);
                // ⚠️ TODO change link definition to .env variable
                await MailService.sendResetPasswordMail(email, `${config.SMTP_HOST}/setpw/${accessToken}`);
            }

            // always send successfull message to sender
            res.status(201).json({ message: `Reset password link sended to ${email}...` });
        } catch (e) {
            res.status(500).json({ message: `Reset password error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get userID from accessToken
     ****************************************** */
    const getUserID = async (req, res) => {
        try {
            const { token } = req.body;
            const user = await TokenService.validateAccessToken(token);

            if ('verifyError' in user) throw new Error(user.verifyError);

            res.status(201).json(user);
        } catch (e) {
            res.status(500).json({ message: `Get userID error, details... ${e.message}` });
        }
    };

    return {
        getUsers,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
        addMemberToUserTeam,
        removeMemberFromUserTeam,
        updTeamMemberWebsites,
        getExcludeUser,
        getUser,
        refreshToken,
        resetPassword,
        getUserID
    };
};

module.exports = usersController;
