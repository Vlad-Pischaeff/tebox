'use strict';

const { MAPS } = require('#s/services/websocketService');

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

    return {
        getOnlineUsersNumber,
    };
};

module.exports = additionalController;
