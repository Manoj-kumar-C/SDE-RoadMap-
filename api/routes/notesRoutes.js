// api/routes/notesRoutes.js
const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// Get all notes
router.get('/', notesController.getNotes);

// Get a specific note by ID
router.get('/:id', notesController.getNoteById);

// Create a new note
router.post('/', notesController.createNote);

module.exports = router;
