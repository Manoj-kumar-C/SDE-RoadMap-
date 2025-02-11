// api/controllers/notesController.js
const notesData = require('../data/notesData');

// Get all notes
exports.getNotes = (req, res) => {
  res.json(notesData);
};

// Get a specific note by ID
exports.getNoteById = (req, res) => {
  const id = parseInt(req.params.id);
  const note = notesData.find((note) => note.id === id);
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res.json(note);
};

// Create a new note
exports.createNote = (req, res) => {
  const newNote = {
    id: notesData.length + 1, // Simple ID generation
    ...req.body,
  };

  notesData.push(newNote); // Add the new note to the in-memory data
  res.status(201).json(newNote);
};
