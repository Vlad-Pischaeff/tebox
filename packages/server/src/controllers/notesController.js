'use strict';

const Notes = require('#s/models/notes');
const NotesService = require('#s/services/notesService');

const notesController = () => {
    /** ******************************************
     * get all notes - host/api/notes?userId=userid&offset=2&num=3
     * @param {string} userId - user ID
     * @param {number} offset - initial point (optional)
     * @param {number} num - quantity (optional)
     ****************************************** */
    const getNotes = async (req, res) => {
        try {
            const notes = await NotesService.aggregateNotes(req);

            res.status(201).json(notes);
        } catch (e) {
            res.status(500).json({ message: `Something wrong, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get single note - host/api/notes/637dafa8efa9a1b203f5f6d1
     * @param {string} id - note ID
     ****************************************** */
    const getNote = async (req, res) => {
        try {
            const { id } = req.params;
            const note = await Notes.findOne({ _id: id, user: req.id });

            res.status(201).json(note);
        } catch (e) {
            res.status(500).json({ message: `Get note error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * add new note
     ****************************************** */
    const addNote = async (req, res) => {
        try {
            const { title, description } = req.body;
            const note = await Notes.create({ user: req.id, title, description });

            res.status(201).json({ note });
        } catch (e) {
            res.status(500).json({ message: `Add note error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * update note - host/api/notes/637dafa8efa9a1b203f5f6d1
     * @param {string} id - note ID
     ****************************************** */
    const updateNote = async (req, res) => {
        try {
            const { id } = req.params;
            await Notes.findByIdAndUpdate(id, req.body);
            const newNote = await Notes.findOne({ _id: id });

            res.status(201).json({ newNote });
        } catch (e) {
            res.status(500).json({ message: `Update note error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * delete note - host/api/notes/637dafa8efa9a1b203f5f6d1
     * @param {string} id - note ID
     ****************************************** */
    const deleteNote = async (req, res) => {
        try {
            const { id } = req.params;
            await Notes.deleteOne({ _id: id });

            res.status(201).json({ message: 'Note deleted succsessfully...' });
        } catch (e) {
            res.status(500).json({ message: `Delete note error, details... ${e.message}` });
        }
    };

    return {
        getNotes,
        getNote,
        addNote,
        updateNote,
        deleteNote
    };
};

module.exports = notesController;
