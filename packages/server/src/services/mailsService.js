'use strict';

const Mails = require('#s/models/mails');

class MailsService {
    async aggregateMail(req) {
        let mails;

        const { recipient } = req.body;
        const { offset, num } = req.query;

        if (offset && num) {
            mails = await Mails.aggregate([
                {
                    $match: { recipients: recipient }
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
            const [value] = mails;
            mails = [...value.data];
        } else {
            mails = await Mails.find({ recipients: recipient });
        }

        return mails;
    }
    /**
     *
     * @param {Object} mail
     */
    async addMail(mail) {
        try {
            const newMail = await Mails.create({ ...mail });
            return newMail;
        } catch (e) {
            return ({ error: `Add mail error, details... ${e.message}` });
        }
    };
}

module.exports = new MailsService();
