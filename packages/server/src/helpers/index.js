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
                    let siteId = site.toString();
                    let memberId = item.member.toString();
                    mappedSites[siteId].teamUserIds.push(memberId);

                    let siteHash = mappedSites[siteId].siteHash;
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
        mapWsToClient.set(ws, obj);
        mapClientToWs.set(obj, ws);
    },
    getID(ws) {
        const obj = mapWsToClient.get(ws);
        // console.log('data...', id);
        return obj;
    },
    getWS(id) {
        const obj = { 'ID': id };
        const ws = mapClientToWs.get(obj);
        // console.log('data...', ws);
        return ws;
    },
};

const DISPATCHER = {
    async register_client(ws, data) {
        CLIENTS_MAP.set(ws, data['REGISTER_CLIENT'].from);

        const siteHash = data['REGISTER_CLIENT'].message;
        const owner = await getSiteOwnerProfile(siteHash);

        const { ID } = CLIENTS_MAP.getID(ws);
        const MSG = {
            'MANAGER_PROFILE': {
                'to': ID,
                'from': owner.id,
                'message': owner,
                'date': Date.now()
            }
        };
        ws.send(JSON.stringify(MSG));
        // console.log('🔵 ws REGISTER_CLIENT...', MSG);
    },
    msg_from_manager(ws, data) {
        const obj = CLIENTS_MAP.getID(ws);
        if (obj) {
            const { ID } = obj;
            const MSG = {
                'MSG_FROM_MANAGER': {
                    'to': ID,
                    'from': 'server',
                    'message': data,
                    'date': Date.now()
                }
            };
            ws.send(JSON.stringify(MSG));
        }
    },
};

module.exports = {
    runWebSitesHashReduce,
    DISPATCHER
};
