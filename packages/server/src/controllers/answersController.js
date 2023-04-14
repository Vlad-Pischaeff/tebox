'use strict';

const Answers = require('#s/models/answers');
const AnswersService = require('#s/services/answersService');

const answersController = () => {
    /** ******************************************
     * get all answers - host/api/answers?userId=userid&offset=2&num=3
     * @param {string} userId - user ID
     * @param {number} offset - initial point (optional)
     * @param {number} num - quantity (optional)
     ****************************************** */
    const getAnswers = async (req, res) => {
        try {
            const answers = await AnswersService.aggregateAnswers(req);

            res.status(201).json(answers);
        } catch (e) {
            res.status(500).json({ message: `Something wrong, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get single answer - host/api/answers/637dafa8efa9a1b203f5f6d1
     * @param {string} id - answer ID
     ****************************************** */
    const getAnswer = async (req, res) => {
        try {
            const { id } = req.params;
            const answer = await Answers.findOne({ _id: id, user: req.id });

            res.status(201).json(answer);
        } catch (e) {
            res.status(500).json({ message: `Get answer error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * add new answer
     ****************************************** */
    const addAnswer = async (req, res) => {
        try {
            const { description } = req.body;
            const answer = await Answers.create({ user: req.id, description });

            res.status(201).json({ answer });
        } catch (e) {
            res.status(500).json({ message: `Add answer error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * update answer - host/api/answers/637dafa8efa9a1b203f5f6d1
     * @param {string} id - answer ID
     ****************************************** */
    const updateAnswer = async (req, res) => {
        try {
            const { id } = req.params;
            await Answers.findByIdAndUpdate(id, req.body);
            const newAnswer = await Answers.findOne({ _id: id });

            res.status(201).json({ newAnswer });
        } catch (e) {
            res.status(500).json({ message: `Update answer error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * delete answer - host/api/answers/637dafa8efa9a1b203f5f6d1
     * @param {string} id - answer ID
     ****************************************** */
    const deleteAnswer = async (req, res) => {
        try {
            const { id } = req.params;
            await Answers.deleteOne({ _id: id });

            res.status(201).json({ message: 'Answer deleted succsessfully...' });
        } catch (e) {
            res.status(500).json({ message: `Delete answer error, details... ${e.message}` });
        }
    };

    return {
        getAnswers,
        getAnswer,
        addAnswer,
        updateAnswer,
        deleteAnswer
    };
};

module.exports = answersController;
