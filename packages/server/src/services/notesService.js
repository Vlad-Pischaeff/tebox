'use strict';

const Notes = require('#s/models/notes');

class NotesService {
    async aggregateNotes(req) {
        let notes;
        const { offset, num } = req.query;

        if (offset && num) {
            notes = await Notes.aggregate([
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
            const [value] = notes;
            notes = [...value.data];
        } else {
            // use with authorization middleware
            notes = await Notes.find({ user: req.id });

            // use without authorization middleware
            // notes = await Notes.find();
        }

        return notes;
    }
}

module.exports = new NotesService();
