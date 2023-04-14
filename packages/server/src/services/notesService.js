'use strict';

const Notes = require('#s/models/notes');

class NotesService {
    async aggregateNotes(req) {
        let notes;
        const { offset, num, userId } = req.query;

        if (offset && num) {
            notes = await Notes.aggregate([
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
            const [value] = notes;
            notes = [...value.data];
        } else {
            notes = await Notes.find({ user: userId });
        }

        return notes;
    }
}

module.exports = new NotesService();
