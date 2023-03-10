'use strict';

const Websites = require('#s/models/websites');
const Users = require('#s/models/users');

let mappedSites = {}, mappedHashSites = {}, mappedUsers = {};
const mapWsToClient = new WeakMap();
const mapClientToWs = new WeakMap();

const runWebSitesHashReduce = async () => {
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

        // console.log(
        //     '✅ mappedSites => \n', mappedSites,
        //     '\n✅ mappedHashSites => \n', mappedHashSites,
        //     '\n✅ mappedUsers => \n', mappedUsers
        // );
    } catch(e) {
        console.log('runWebSitesHashReduce error ...', e);
    }
}

const getMappedSites = function() {
    return mappedSites;
};

const getMappedHashSites = function() {
    return mappedHashSites;
};

const getMappedUsers = function() {
    return mappedUsers;
};

const getSiteOwnerProfile = async function(hash) {
    const site = mappedHashSites[`$2a$10$${hash}`];
    const ownerId = site.ownerId;

    const owner = await Users.findOne({ _id: ownerId });

    const { id, name, alias, image, greeting } = owner;

    return ({ id, name, alias, image, greeting });
};

const CLIENTS_MAP = {
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
        CLIENTS_MAP.set(ws, data['REGISTER_CLIENT'].from);

        const siteHash = data['REGISTER_CLIENT'].message;
        const owner = await getSiteOwnerProfile(siteHash);

        // const { ID } = CLIENTS_MAP.getID(ws);
        const MSG = {
            'MANAGER_PROFILE': {
                'to': ws.id,
                'from': owner.id,
                'message': owner,
                'date': Date.now()
            }
        };
        ws.send(JSON.stringify(MSG));
        console.log('🔹 ws REGISTER_CLIENT..');
    },
    MSG_FROM_MANAGER(ws, data) {
        // const obj = CLIENTS_MAP.getID(ws);
        if (ws.id !== 'server') {
            // const { ID } = obj;
            const MSG = {
                'MSG_FROM_MANAGER': {
                    'to': ws.id,
                    'from': 'server',
                    'message': data,
                    'date': Date.now()
                }
            };
            ws.send(JSON.stringify(MSG));
            console.log('🔹 ws MSG_FROM_MANAGER..');
        }
    },
    MSG_FROM_CLIENT(ws, data) {
        console.log('🔹 ws MSG_FROM_CLIENT..', data);
    },
    run(ws, message) {
        let data = JSON.parse(message);
        const [ key ] = Object.keys(data);

        console.log('🧭 WS MSG DATA..', key);

        DISPATCHER[key](ws, data);
    },
};

module.exports = {
    runWebSitesHashReduce,
    DISPATCHER
};
