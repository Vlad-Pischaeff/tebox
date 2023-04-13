'use strict';

const Websites = require('#s/models/websites');
const Users = require('#s/models/users');

class WebsitesService {
    async aggregateWebsites(req) {
        let websites;
        const { offset, num } = req.query;

        if (offset && num) {
            websites = await Websites.aggregate([
                {
                    $match: { user: req.id }
                },
                {
                    $facet: {
                        data: [
                            { $skip: +offset },
                            { $limit: +num }
                        ]
                    }
                }
            ]);
            const [value] = websites;
            websites = [...value.data];
        } else {
            // use with authorization middleware
            websites = await Websites.find({ user: req.id });

            // use without authorization middleware
            // websites = await Websites.find();
        }

        return websites;
    }

    async removeWebsiteFromAllDocuments(req) {
        const userID = req.id;
        const siteID = req.params.id;

        // ✅ remove site
        await Websites.deleteOne({ _id: siteID });

        // ✅ remove site from members sites
        await Users.updateMany(
            { _id: userID },
            { $pull:
                {
                    'team.$[].sites': { $eq: siteID }
                }
            }
        );
    }
    /**
     *
     * Add online users on site
     * @param {string} siteHash
     * @param {string} userId
     */
    async addWebsiteUser(siteHash, userId) {
        await Websites.updateOne(
            { hash: `$2a$10$${siteHash}` },
            { $push: { "onlineUsers": userId } });
    }
    /**
     *
     * Remove user from onlineUsers
     * @param {string} siteHash
     * @param {string} userId
     */
    async delWebsiteUser(siteHash, userId) {
        await Websites.updateOne(
            { hash: `$2a$10$${siteHash}` },
            { $pull: { "onlineUsers": userId } });
    }
}

module.exports = new WebsitesService();
