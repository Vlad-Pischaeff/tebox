'use strict';

const Mails = require('#s/models/mails');

class MailsService {
    async aggregateMail(req) {
        let mails;
        const { offset, num } = req.query;

        if (offset && num) {
            mails = await Mails.aggregate([
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
            const [value] = mails;
            mails = [...value.data];
        } else {
            // use with authorization middleware
            mails = await Mails.find({ user: req.id });

            // use without authorization middleware
            // mails = await Mails.find();
        }

        return mails;
    }
}

module.exports = new MailsService();
