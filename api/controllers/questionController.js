// api/controllers/questionController.js
const questionData = require('../data/questionData');

// Get all questions
exports.getAllQuestions = (req, res) => {
  res.json(questionData);
};

// Get a specific question by ID
exports.getQuestionById = (req, res) => {
  const id = parseInt(req.params.id);
  const question = questionData.find((q) => q.id === id);
  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }
  res.json(question);
};

// Create a new question
exports.createQuestion = (req, res) => {
  const newQuestion = {
    id: questionData.length + 1, // Simple ID generation
    ...req.body,
  };

  questionData.push(newQuestion); // Add the new question to the in-memory data
  res.status(201).json(newQuestion);
};
