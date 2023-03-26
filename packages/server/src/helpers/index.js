'use strict';

const Websites = require('#s/models/websites');
const Users = require('#s/models/users');

let mappedSites = {}, mappedHashSites = {}, mappedUsers = {};
const mapWsToClient = new WeakMap();
const mapClientToWs = new WeakMap();

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
            console.log('✅ mappedUsers..', mappedUsers, users)
            console.log('✅ mappedSites..', mappedSites)
            console.log('✅ mappedHashSites..', mappedHashSites)
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
        const ownerId = site.ownerId;

        const owner = await Users.findOne({ _id: ownerId });

        const { id, name, alias, image, greeting } = owner;

        return ({ id, name, alias, image, greeting });
    },
};

const MAPS = {
    set(ws, id) {
        const obj = { 'ID': id };
        ws.id = id;
        mapWsToClient.set(ws, obj);
        mapClientToWs.set(obj, ws);
    },
    getID(ws) {
        return mapWsToClient.get(ws);
    },
    getWS(id) {
        const obj = { 'ID': id };
        return mapClientToWs.get(obj);
    },
};

const DISPATCHER = {
    async REGISTER_CLIENT(ws, data) {
        MAPS.set(ws, data['REGISTER_CLIENT'].from);

        const siteHash = data['REGISTER_CLIENT'].to;
        const owner = await HELPER.getSiteOwnerProfile(siteHash);

        // 3 step. after register client send site owner profile to client
        const MSG = DISPATCHER.msg('MANAGER_PROFILE', ws.id, owner.id, owner);
        ws.send(MSG);
        console.log('🔹 ws REGISTER_CLIENT..');
    },
    MSG_FROM_MANAGER(ws, data) {
        // const obj = MAPS.getID(ws);
        if (ws.id !== 'server') {
            // const { ID } = obj;
            const MSG = DISPATCHER.msg('MSG_FROM_MANAGER', ws.id, 'server', data);
            // ws.send(MSG);
            console.log('🔹 ws MSG_FROM_MANAGER..');
        }
    },
    MSG_FROM_SERVER(ws, data) {
        // const obj = MAPS.getID(ws);
        if (ws.id !== 'server') {
            // const { ID } = obj;
            const MSG = DISPATCHER.msg('MSG_FROM_SERVER', ws.id, 'server', data);
            ws.send(MSG);
            console.log('🔹 ws MSG_FROM_SERVER..');
        }
    },
    MSG_FROM_CLIENT(ws, data) {
        console.log('🔹 ws MSG_FROM_CLIENT..', data);
    },
    MAIL_FROM_CLIENT(ws, data) {
        console.log('🔹 ws MAIL_FROM_CLIENT..', data);
    },
    MANAGER_IS_ONLINE(ws, data) {
        console.log('🔹 ws MANAGER_IS_ONLINE..', data);
        MAPS.set(ws, data['MANAGER_IS_ONLINE'].from);
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
    HELPER
};
