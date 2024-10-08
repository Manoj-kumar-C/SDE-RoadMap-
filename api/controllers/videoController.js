// api/controllers/videoController.js
const videoData = require('../data/videoData');

// Get all videos
exports.getAllVideos = (req, res) => {
  res.json(videoData);
};

// Get a specific video by ID
exports.getVideoById = (req, res) => {
  const id = parseInt(req.params.id);
  const video = videoData.find((v) => v.id === id);
  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }
  res.json(video);
};

// Create a new video
exports.createVideo = (req, res) => {
  const newVideo = {
    id: videoData.length + 1, // Simple ID generation
    ...req.body,
  };

  videoData.push(newVideo); // Add the new video to the in-memory data
  res.status(201).json(newVideo);
};
