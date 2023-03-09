'use strict';

const Websites = require('#s/models/websites');
const Users = require('#s/models/users');

let mappedSites = {}, mappedHashSites = {}, mappedUsers = {};
const wsClientsMap = new WeakMap();

const doWebSitesHashReduce = async () => {
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
        console.log('doWebSitesHashReduce error ...', e);
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
    set(ws, obj) {
        wsClientsMap.set(ws, obj);
    },
    get(ws) {
        return wsClientsMap.get(ws);
    },
};

const DISPATCHER = {
    async register_client(ws, data) {
        CLIENTS_MAP.set(ws, data['REGISTER_CLIENT'].from);

        const siteHash = data['REGISTER_CLIENT'].message;
        const owner = await getSiteOwnerProfile(siteHash);

        const TO = CLIENTS_MAP.get(ws);
        const MSG = {
            'MANAGER_PROFILE': {
                'to': TO,
                'from': owner.id,
                'message': owner,
                'date': Date.now()
            }
        };
        ws.send(JSON.stringify(MSG));
        console.log('🔵 ws REGISTER_CLIENT...', MSG);
    },
    msg_from_manager(ws, data) {
        const TO = CLIENTS_MAP.get(ws);
        const MSG = {
            'MSG_FROM_MANAGER': {
                'to': TO,
                'from': 'server',
                'message': data,
                'date': Date.now()
            }
        };
        ws.send(JSON.stringify(MSG));
    },
};

module.exports = {
    doWebSitesHashReduce,
    CLIENTS_MAP,
    DISPATCHER
};
