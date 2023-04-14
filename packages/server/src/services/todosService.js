'use strict';

const Todos = require('#s/models/todos');

class TodosService {
    async aggregateTodo(req) {
        let todos;
        const { offset, num, userId } = req.query;

        if (offset && num) {
            todos = await Todos.aggregate([
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
            const [value] = todos;
            todos = [...value.data];
        } else {
            todos = await Todos.find({ user: userId });
        }

        return todos;
    }
}

module.exports = new TodosService();
