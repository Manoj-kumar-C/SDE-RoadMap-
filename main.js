// main.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors')
// Middleware for parsing JSON
app.use(express.json());
app.use(cors({
  origin: '*', // Allow your localhost
}));

app.use(express.static('images'));
app.use(express.static('pdf'));
// Import routes
const roadmapRoutes = require('./api/routes/roadmapRoutes');
const videoRoutes = require('./api/routes/videoRoutes');
const questionRoutes = require('./api/routes/questionRoutes');

// Use routes
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/questions', questionRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; // Export the app for Vercel
