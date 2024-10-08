// api/routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Get all questions
router.get('/', questionController.getAllQuestions);

// Get a specific question by ID
router.get('/:id', questionController.getQuestionById);

// Create a new question
router.post('/', questionController.createQuestion);

module.exports = router;
