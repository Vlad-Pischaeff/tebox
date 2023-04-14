'use strict';

const Mails = require('#s/models/mails');

class MailsService {
    async aggregateMail(req) {
        let mails;

        const { offset, num, userId } = req.query;

        if (offset && num) {
            mails = await Mails.aggregate([
                {
                    $match: { recipients: userId }
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
            mails = await Mails.find({ recipients: userId });
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
