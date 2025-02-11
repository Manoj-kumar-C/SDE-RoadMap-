const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['https://sde-roadmap-alpha.vercel.app', 'http://localhost:3001'],
    optionsSuccessStatus: 200,
  })
);

// Static Files
app.use('/pdf', express.static(path.join(__dirname, 'pdf')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Import Routes
const roadmapRoutes = require('./api/routes/roadmapRoutes');
const videoRoutes = require('./api/routes/videoRoutes');
const questionRoutes = require('./api/routes/questionRoutes');
const notesRoutes = require('./api/routes/notesRoutes');

// Use Routes
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/notes', notesRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Start the Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; // Export the app for Vercel
