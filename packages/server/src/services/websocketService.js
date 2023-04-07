'use strict';

const Websites = require('#s/models/websites');
const Users = require('#s/models/users');
const MailsService = require('#s/services/mailsService');

let mappedSites = {}, mappedHashSites = {}, mappedUsers = {};
let WebSockets = {};
const mapWsToClient = new WeakMap();


const HELPER = {
    async runWebSitesHashReduce() {
        try {
            const websites = await Websites.find();
            const users = await Users.find();

            mappedSites = websites.reduce((summary, item) => {   // mappedSites
                summary[item.id.toString()] = {
                    'siteName': item.site,
                    'siteHash': item.hash,
                    'ownerId': item.user.toString(),
                    'teamUserIds': [],
                };
                return summary;
            }, {});

            mappedHashSites = websites.reduce((summary, item) => {   // mappedSites
                summary[item.hash] = {
                    'siteName': item.site,
                    'siteId': item.id,
                    'ownerId': item.user.toString(),
                    'teamUserIds': [],
                };
                return summary;
            }, {});

            mappedUsers = users.reduce((summary, item) => {     // mappedUsers
                summary.push( ...item.team )
                return summary;
            }, []);

            mappedUsers.forEach((item) => {
                if (item.sites.lenght !== 0) {
                    item.sites.forEach((site) => {
                        const memberId = item.member.toString();

                        const siteId = site.toString();
                        mappedSites[siteId].teamUserIds.push(memberId);

                        const siteHash = mappedSites[siteId].siteHash;
                        mappedHashSites[siteHash].teamUserIds.push(memberId);
                    })
                }
            });
            // console.log('✅ mappedUsers..', mappedUsers, users)
            // console.log('✅ mappedSites..', mappedSites)
            // console.log('✅ mappedHashSites..', mappedHashSites)
        } catch(e) {
            console.log('runWebSitesHashReduce error ...', e);
        }
    },
    getMappedSites() {
        return mappedSites;
    },
    getMappedHashSites() {
        return mappedHashSites;
    },
    getMappedUsers() {
        return mappedUsers;
    },
    async getSiteOwnerProfile(hash) {
        const site = mappedHashSites[`$2a$10$${hash}`];
        console.log('site...', site)

        if (site) {
            const ownerId = site.ownerId;

            const owner = await Users.findOne({ _id: ownerId });

            const { id, name, alias, image, greeting } = owner;

            return ({ id, name, alias, image, greeting });
        } else {
            return null;
        }
    },
};

const MAPS = {
    set(ws, id) {
        ws.id = id;
        const obj = { 'ID': id };
        mapWsToClient.set(ws, obj);
        WebSockets = { ...WebSockets, [id]: ws };
    },
    delete(ws, id) {
        const obj = { 'ID': id };
        mapWsToClient.delete(ws, obj);
        delete WebSockets[id];
    },
    getID(ws) {
        return mapWsToClient.get(ws);
    },
    getWS(id) {
        return WebSockets[id];
    },
};

const DISPATCHER = {
    async REGISTER_CLIENT(ws, data) {           // ✅
        const { to, from } = data['REGISTER_CLIENT'];

        MAPS.set(ws, from);

        const owner = await HELPER.getSiteOwnerProfile(to);

        if (owner) {
            // 3 step. after register client send site owner profile to client
            const MSG = DISPATCHER.msg('MANAGER_PROFILE', from, owner.id, owner);
            ws.send(MSG);
            console.log('🔹 ws REGISTER_CLIENT..');
        }
    },
    MSG_FROM_MANAGER(_, data) {                 // ✅
        const { to } = data['MSG_FROM_MANAGER'];

        let Socket = MAPS.getWS(to);                    // ..get WebSocket of client
        if (Socket) Socket.send(JSON.stringify(data));  // ..retransmit message to client

        console.log('🔹 ws MSG_FROM_MANAGER..');
    },
    MSG_FROM_SERVER(ws, data) {                 // ✅
        if (ws.id !== 'server') {
            const MSG = DISPATCHER.msg('MSG_FROM_SERVER', ws.id, 'server', data);
            ws.send(MSG);
            console.log('🔹 ws MSG_FROM_SERVER..');
        }
    },
    MSG_FROM_CLIENT(_, data) {                  // ✅
        const { to, from, message } = data['MSG_FROM_CLIENT'];

        const site = mappedHashSites[`$2a$10$${to}`];

        const { ownerId, teamUserIds } = site;
        const recipients = [ ownerId, ...teamUserIds ];

        // ✔️..send notification to site's owner and his team members
        recipients.forEach((recipient) => {
            const MSG = DISPATCHER.msg('MSG_FROM_CLIENT', recipient, from, message);
            let Socket = MAPS.getWS(recipient);     // ✔️..get WebSocket of recipient
            if (Socket) Socket.send(MSG);
        });
        console.log('🔹 ws MSG_FROM_CLIENT to owner..', data);
    },
    async MAIL_FROM_CLIENT(ws, data) {
        const { to, from, message } = data['MAIL_FROM_CLIENT'];

        const site = mappedHashSites[`$2a$10$${to}`];

        const { ownerId, teamUserIds } = site;
        const recipients = [ ownerId, ...teamUserIds ];

        // ✔️..add new mail to database
        const mail = { recipients, ...data['MAIL_FROM_CLIENT'] };
        const newMail = await MailsService.addMail(mail);

        // ✔️..send notification to site's owner and his team members
        recipients.forEach((recipient) => {
            const MSG = DISPATCHER.msg('MAIL_FROM_CLIENT', recipient, from, message);
            let Socket = MAPS.getWS(recipient);     // ✔️..get WebSocket of recipient
            if (Socket) Socket.send(MSG);
        });
        console.log('🔹 ws MAIL_FROM_CLIENT..', newMail, data);
    },
    MANAGER_IS_ONLINE(ws, data) {
        console.log('🔹 ws MANAGER_IS_ONLINE..', data);
        MAPS.set(ws, data['MANAGER_IS_ONLINE'].from);
    },
    MANAGER_IS_OFFLINE(ws, data) {
        console.log('🔹 ws MANAGER_IS_OFFLINE..', data);
        MAPS.delete(ws, data['MANAGER_IS_OFFLINE'].from);
        ws.close();
    },
    run(ws, message) {
        let data = JSON.parse(message);
        const [ key ] = Object.keys(data);

        console.log('🧭 WS KEY..', key);

        DISPATCHER[key](ws, data);
    },
    msg(type, to, from, message) {
        const MSG = {
            [type]: {
                to,
                from,
                message,
                'date': Date.now()
            }
        };
        return JSON.stringify(MSG);
    },
};

module.exports = {
    DISPATCHER,
    HELPER,
    MAPS
};
