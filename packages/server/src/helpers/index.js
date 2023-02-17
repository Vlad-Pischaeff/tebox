'use strict';

const Websites = require('#s/models/websites');
const Users = require('#s/models/users');

let mappedSites = {}, mappedUsers = {};

exports.doWebSitesHashReduce = async () => {
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
                })
            }
        });

        // console.log('✅ mappedSites => \n', mappedSites, '\n✅ mappedUsers => \n', mappedUsers);
    } catch(e) {
        console.log('doWebSitesHashReduce error ...', e);
    }
}

exports.getMappedSites = function() {
    return mappedSites;
};

exports.getMappedUsers = function() {
    return mappedUsers;
};
