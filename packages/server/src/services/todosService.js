'use strict';

const Todos = require('#s/models/todos');

class TodosService {
    async aggregateTodo(req) {
        let todos;
        const { offset, num } = req.query;

        if (offset && num) {
            todos = await Todos.aggregate([
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
            const [value] = todos;
            todos = [...value.data];
        } else {
            // use with authorization middleware
            todos = await Todos.find({ user: req.id });

            // use without authorization middleware
            // todos = await Todos.find();
        }

        return todos;
    }
}

module.exports = new TodosService();
