// api/routes/roadmapRoutes.js
const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');

// Get all roadmap items
router.get('/', roadmapController.getRoadmapItems);

// Get a specific roadmap item by ID
router.get('/:id', roadmapController.getRoadmapItemById);

// Create a new roadmap item
router.post('/', roadmapController.createRoadmapItem);

module.exports = router;
