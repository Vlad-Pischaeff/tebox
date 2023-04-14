'use strict';

const { MAPS, HELPER } = require('#s/services/websocketService');

const additionalController = () => {
    /** ******************************************
     * get number of users on site - host/api/usrnumbers?hash=siteHash
     * @param {string} key - site HASH
     ****************************************** */
    // const getOnlineUsersNumber = async (req, res) => {
    //     try {
    //         const { hash } = req.query;

    //         const number = MAPS.getWebsiteUsers(hash);

    //         res.status(201).json(number);
    //     } catch (e) {
    //         res.status(500).json({ message: `Get online users error, details... ${e.message}` });
    //     }
    // };
    /** ******************************************
     * get all monitored websites of manager - host/api/mngsites
     * @param {string} userId - manager ID
     ****************************************** */
    const getMonitoredWebsites = async (req, res) => {
        try {
            const { userId } = req.query;     // ..only if user is authorized

            const websites = await HELPER.getSitesToWhichManagersSubscribe(userId);

            res.status(201).json(websites);
        } catch (e) {
            res.status(500).json({ message: `Get monitored websites error, details... ${e.message}` });
        }
    };
    return {
        // getOnlineUsersNumber,
        getMonitoredWebsites
    };
};

module.exports = additionalController;
