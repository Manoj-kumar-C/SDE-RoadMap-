// api/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Get all videos
router.get('/', videoController.getAllVideos);

// Get a specific video by ID
router.get('/:id', videoController.getVideoById);

// Create a new video
router.post('/', videoController.createVideo);

module.exports = router;
