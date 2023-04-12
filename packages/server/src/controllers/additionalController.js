'use strict';

const { MAPS, HELPER } = require('#s/services/websocketService');

const additionalController = () => {
    /** ******************************************
     * get number of users on site - host/api/extra
     * @param {string} key - site KEY (HASH)
     ****************************************** */
    const getOnlineUsersNumber = async (req, res) => {
        try {
            const { key } = req.params;
            const number = MAPS.getOnlineUsersNumber(key);

            res.status(201).json(number);
        } catch (e) {
            res.status(500).json({ message: `Get online users error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get all monitored websites of manager - host/api/mngsites
     * @param {string} id - manager ID
     ****************************************** */
    const getMonitoredWebsites = async (req, res) => {
        try {
            const { id } = req.params;
            const websites = await HELPER.getSitesToWhichManagersSubscribe(id);

            res.status(201).json(websites);
        } catch (e) {
            res.status(500).json({ message: `Get monitored websites error, details... ${e.message}` });
        }
    };
    return {
        getOnlineUsersNumber,
        getMonitoredWebsites
    };
};

module.exports = additionalController;
