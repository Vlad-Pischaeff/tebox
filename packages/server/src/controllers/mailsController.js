'use strict';

const Mails = require('#s/models/mails');
const MailsService = require('#s/services/mailsService');

const mailsController = () => {
    /** ******************************************
     * get all mails - host/api/mails?offset=2&num=3
     * @param {number} offset - initial point (optional)
     * @param {number} num - quantity (optional)
     ****************************************** */
    const getMails = async (req, res) => {
        try {
            const mails = await MailsService.aggregateMail(req);

            res.status(201).json(mails);
        } catch (e) {
            res.status(500).json({ message: `Something wrong, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get single mail - host/api/mails/637dafa8efa9a1b203f5f6d1
     * @param {string} id - mail ID
     ****************************************** */
    const getMail = async (req, res) => {
        try {
            // const { id } = req.params;
            const mail = await Mails.findOne({ _id: id });

            res.status(201).json(mail);
        } catch (e) {
            res.status(500).json({ message: `Get mail error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * add new mail
     ****************************************** */
    const addMail = async (req, res) => {
        try {
            const { to, from, message, date } = req.body;
            const mail = await Mails.create({ to, from, message, date });

            res.status(201).json({ mail });
        } catch (e) {
            res.status(500).json({ message: `Add mail error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * update mail - host/api/mails/637dafa8efa9a1b203f5f6d1
     * @param {string} id - mail ID
     ****************************************** */
    const updateMail = async (req, res) => {
        try {
            const { id } = req.params;
            await Mails.findByIdAndUpdate(id, req.body);
            const newMail = await Mails.findOne({ _id: id });

            res.status(201).json({ newMail });
        } catch (e) {
            res.status(500).json({ message: `Update mail error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * delete mail - host/api/mails/637dafa8efa9a1b203f5f6d1
     * @param {string} id - mail ID
     ****************************************** */
    const deleteMail = async (req, res) => {
        try {
            const { id } = req.params;
            await Mails.deleteOne({ _id: id });

            res.status(201).json({ message: 'Mail deleted succsessfully...' });
        } catch (e) {
            res.status(500).json({ message: `Delete mail error, details... ${e.message}` });
        }
    };

    return {
        getMails,
        getMail,
        addMail,
        updateMail,
        deleteMail
    };
};

module.exports = mailsController;
