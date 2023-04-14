'use strict';

const Answers = require('#s/models/answers');

class AnswersService {
    async aggregateAnswers(req) {
        let answers;
        const { offset, num, userId } = req.query;

        if (offset && num) {
            answers = await Answers.aggregate([
                {
                    $match: { user: userId }
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
            answers = await Answers.find({ user: userId });
        }

        return answers;
    }
}

module.exports = new AnswersService();
