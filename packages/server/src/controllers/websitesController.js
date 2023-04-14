'use strict';

const Websites = require('#s/models/websites');
const WebsitesService = require('#s/services/websitesService');

const websitesController = () => {
    /** ******************************************
     * get all websites - host/api/websites?userId=userid&offset=2&num=3
     * @param {string} userId - user ID
     * @param {number} offset - initial point (optional)
     * @param {number} num - quantity (optional)
     ****************************************** */
    const getWebsites = async (req, res) => {
        try {
            const websites = await WebsitesService.aggregateWebsites(req);

            res.status(201).json(websites);
        } catch (e) {
            res.status(500).json({ message: `Something wrong, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get single website - host/api/websites/637dafa8efa9a1b203f5f6d1
     * @param {string} id - website ID
     ****************************************** */
    const getWebsite = async (req, res) => {
        try {
            const { id } = req.params;

            if (id) {
                const website = await Websites.findOne({ _id: id });
                res.status(201).json(website);
            }
        } catch (e) {
            res.status(500).json({ message: `Get website error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * add new website
     ****************************************** */
    const addWebsite = async (req, res) => {
        try {
            const { site, key, hash } = req.body;

            const website = await Websites.create({ user: req.id, site, key, hash });

            res.status(201).json({ website });
        } catch (e) {
            res.status(500).json({ message: `Add website error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * update website - host/api/websites/637dafa8efa9a1b203f5f6d1
     * @param {string} id - website ID
     ****************************************** */
    const updateWebsite = async (req, res) => {
        try {
            const { id } = req.params;
            await Websites.findByIdAndUpdate(id, req.body);
            const newWebsite = await Websites.findOne({ _id: id });

            res.status(201).json({ newWebsite });
        } catch (e) {
            res.status(500).json({ message: `Update website error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * delete website - host/api/websites/637dafa8efa9a1b203f5f6d1
     * @param {string} id - website ID
     ****************************************** */
    const deleteWebsite = async (req, res) => {
        try {
            await WebsitesService.removeWebsiteFromAllDocuments(req);

            res.status(201).json({ message: 'Website deleted successfully...' });
        } catch (e) {
            res.status(500).json({ message: `Delete website error, details... ${e.message}` });
        }
    };

    return {
        getWebsites,
        getWebsite,
        addWebsite,
        updateWebsite,
        deleteWebsite
    };
};

module.exports = websitesController;
