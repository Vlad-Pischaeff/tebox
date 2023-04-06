'use strict';

const Mails = require('#s/models/mails');

class MailsService {
    async aggregateMail(req) {
        let mails;

        const arrayOfHash = req.body.map(hash => hash.substring(7));

        const { offset, num } = req.query;

        if (offset && num) {
            mails = await Mails.aggregate([
                {
                    $match: { to: arrayOfHash }
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
            mails = await Mails.find({ to: arrayOfHash });
            // mails = await Mails.find();
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
