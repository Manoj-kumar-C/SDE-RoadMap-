// api/controllers/roadmapController.js
const roadmapData = require('../data/roadmapData');

// Get all roadmap items
exports.getRoadmapItems = (req, res) => {
  res.json(roadmapData);
};

// Get a specific roadmap item by ID
exports.getRoadmapItemById = (req, res) => {
  const id = parseInt(req.params.id);
  const item = roadmapData.find((roadmap) => roadmap.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Roadmap item not found' });
  }
  res.json(item);
};

// Create a new roadmap item
exports.createRoadmapItem = (req, res) => {
  const newItem = {
    id: roadmapData.length + 1, // Simple ID generation
    ...req.body,
  };

  roadmapData.push(newItem); // Add the new item to the in-memory data
  res.status(201).json(newItem);
};
