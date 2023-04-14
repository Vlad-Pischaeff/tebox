'use strict';

const Todos = require('#s/models/todos');
const TodosService = require('#s/services/todosService');

const todosController = () => {
    /** ******************************************
     * get all todos - host/api/todos?userId=userid&offset=2&num=3
     * @param {string} userId - user ID
     * @param {number} offset - initial point (optional)
     * @param {number} num - quantity (optional)
     ****************************************** */
    const getTodos = async (req, res) => {
        try {
            const todos = await TodosService.aggregateTodo(req);

            res.status(201).json(todos);
        } catch (e) {
            res.status(500).json({ message: `Something wrong, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get single todo - host/api/todos/637dafa8efa9a1b203f5f6d1
     * @param {string} id - todo ID
     ****************************************** */
    const getTodo = async (req, res) => {
        try {
            const { id } = req.params;
            const todo = await Todos.findOne({ _id: id, user: req.id });

            res.status(201).json(todo);
        } catch (e) {
            res.status(500).json({ message: `Get todo error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * add new todo
     ****************************************** */
    const addTodo = async (req, res) => {
        try {
            const { description } = req.body;
            const todo = await Todos.create({ user: req.id, description });

            res.status(201).json({ todo });
        } catch (e) {
            res.status(500).json({ message: `Add todo error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * update todo - host/api/todos/637dafa8efa9a1b203f5f6d1
     * @param {string} id - todo ID
     ****************************************** */
    const updateTodo = async (req, res) => {
        try {
            const { id } = req.params;
            await Todos.findByIdAndUpdate(id, req.body);
            const newTodo = await Todos.findOne({ _id: id });

            res.status(201).json({ newTodo });
        } catch (e) {
            res.status(500).json({ message: `Update todo error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * delete todo - host/api/todos/637dafa8efa9a1b203f5f6d1
     * @param {string} id - todo ID
     ****************************************** */
    const deleteTodo = async (req, res) => {
        try {
            const { id } = req.params;
            await Todos.deleteOne({ _id: id });

            res.status(201).json({ message: 'Todo deleted succsessfully...' });
        } catch (e) {
            res.status(500).json({ message: `Delete todo error, details... ${e.message}` });
        }
    };

    return {
        getTodos,
        getTodo,
        addTodo,
        updateTodo,
        deleteTodo
    };
};

module.exports = todosController;
