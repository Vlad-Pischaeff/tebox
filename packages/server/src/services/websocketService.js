'use strict';

const Websites = require('#s/models/websites');
const Users = require('#s/models/users');
const MailsService = require('#s/services/mailsService');
const WebsitesService = require('#s/services/WebsitesService');

let mappedSites = {}, mappedHashSites = {};
let mappedUsers = [];
let WebSockets = {};
let sitesToWhichManagersSubscribe = {};
const mapWsToClient = new WeakMap();


const HELPER = {
    async runWebSitesHashReduce() {
        try {
            const websites = await Websites.find();
            const users = await Users.find();

            const objS = websites.reduce((summary, item) => {   // mappedSites by ID
                summary[item.id] = {
                    'siteName': item.site,
                    'siteHash': item.hash,
                    'ownerId': item.user.toString(),
                    'teamUserIds': [],
                };
                return summary;
            }, {});

            const objH = websites.reduce((summary, item) => {   // mappedSites by Hash
                summary[item.hash] = {
                    'siteName': item.site,
                    'siteId': item.id,
                    'ownerId': item.user.toString(),
                    'teamUserIds': [],
                };
                return summary;
            }, {});

            const arr = users.reduce((summary, item) => {       // mappedUsers
                summary.push( ...item.team )
                return summary;
            }, []);

            mappedUsers = arr;

            const obj = mappedUsers.reduce((summary, item) => {
                const key = item.member.toString();
                summary[key] = item.sites;
                return summary;
            }, {});

            sitesToWhichManagersSubscribe = obj;

            mappedUsers.forEach((item) => {
                if (item.sites.lenght !== 0) {
                    item.sites.forEach((site) => {
                        const memberId = item.member.toString();

                        const siteId = site.toString();
                        objS[siteId].teamUserIds.push(memberId);

                        const siteHash = objS[siteId].siteHash;
                        objH[siteHash].teamUserIds.push(memberId);
                    })
                }
            });

            mappedSites = objS;
            mappedHashSites = objH;
            // console.log('✅ mappedUsers..', mappedUsers)
            // console.log('✅ sitesToWhichManagersSubscribe..', sitesToWhichManagersSubscribe)
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
    getMappedHashSite(hash) {
        return mappedHashSites[`$2a$10$${hash}`];
    },
    getMappedUsers() {
        return mappedUsers;
    },
    getSitesToWhichManagersSubscribe(id) {
        if (id in sitesToWhichManagersSubscribe) {
            return sitesToWhichManagersSubscribe[id];
        } else {
            return [];
        }
    },
    async getSiteOwnerProfile(hash) {
        const site = HELPER.getMappedHashSite(hash);

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
    set(ws, id, hash = '') {
        ws.id = id;
        const obj = { 'ID': id, 'HASH': hash };
        mapWsToClient.set(ws, obj);
        WebSockets = { ...WebSockets, [id]: ws };
    },
    delete(ws, id) {
        mapWsToClient.delete(ws);
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

        MAPS.set(ws, from, to);
        await WebsitesService.addWebsiteUser(to, from);

        const owner = await HELPER.getSiteOwnerProfile(to);

        if (owner) {
            // 3 step. after register client send site owner profile to client
            const MSG = DISPATCHER.msg('MANAGER_PROFILE', from, owner.id, owner);
            ws.send(MSG);
            console.log('🔹 ws REGISTER_CLIENT SUCCESSFULLY..✅');
        } else {
            console.log('🔹 ws REGISTER_CLIENT FAILED..❌');
        }
    },
    async MSG_FROM_MANAGER(_, data) {                 // ✅
        const { to, from, message } = data['MSG_FROM_MANAGER'];

        let Socket = MAPS.getWS(to);                    // ..get WebSocket of client
        if (Socket) Socket.send(JSON.stringify(data));  // ..retransmit message to client

        // 💡🚩 TODO add retransmit message to other managers of this site
        const site = await WebsitesService.getWebsiteUserLogedIn(to);

        const siteHashMap = HELPER.getMappedHashSite(site.hash.substring(7));

        const { ownerId, teamUserIds } = siteHashMap;
        const recipients = [ ownerId, ...teamUserIds ];

        // ✔️..send message to other site's managers exclude sender
        recipients.forEach((recipient) => {
            if ( recipient !== from ) {
                const MSG = DISPATCHER.msg('MSG_FROM_MANAGER', to, recipient, message);
                let Socket = MAPS.getWS(recipient);     // ✔️..get WebSocket of recipient
                if (Socket) Socket.send(MSG);
            }
        });

        console.log('🔹 ws MSG_FROM_MANAGER..', data['MSG_FROM_MANAGER'], site);
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

        const site = HELPER.getMappedHashSite(to);

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
    async MAIL_FROM_CLIENT(ws, data) {          // ✅
        const { to, from } = data['MAIL_FROM_CLIENT'];

        const site = HELPER.getMappedHashSite(to);

        const { ownerId, teamUserIds } = site;
        const recipients = [ ownerId, ...teamUserIds ];

        // ✔️..add new mail to database
        const mail = { recipients, ...data['MAIL_FROM_CLIENT'] };
        const newMail = await MailsService.addMail(mail);

        // ✔️..send notification to site's owner and his team members
        recipients.forEach((recipient) => {
            const MSG = DISPATCHER.msg('MAIL_FROM_CLIENT', recipient, from, newMail);
            let Socket = MAPS.getWS(recipient);     // ✔️..get WebSocket of recipient
            if (Socket) Socket.send(MSG);
        });
        console.log('🔹 ws MAIL_FROM_CLIENT..', newMail, data);
    },
    MANAGER_IS_ONLINE(ws, data) {
        console.log('🔹 ws MANAGER_IS_ONLINE..', data);
        const { from , to } = data['MANAGER_IS_ONLINE'];
        MAPS.set(ws, from, to);
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
