'use strict';

const Answers = require('#s/models/answers');

class AnswersService {
    async aggregateAnswers(req) {
        let answers;
        const { offset, num } = req.query;

        if (offset && num) {
            answers = await Answers.aggregate([
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
            const [value] = answers;
            answers = [...value.data];
        } else {
            // use with authorization middleware
            answers = await Answers.find({ user: req.id });

            // use without authorization middleware
            // answers = await Answers.find();
        }

        return answers;
    }
}

module.exports = new AnswersService();
