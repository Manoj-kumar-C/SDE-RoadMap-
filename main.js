// main.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors')
// Middleware for parsing JSON
app.use(express.json());
app.use(cors({
  origin: [ 'https://sde-roadmap-alpha.vercel.app/','http://localhost:3001/','*'], 
  optionsSuccessStatus: 200,// Allow your localhost
}));
const path = require('path');
app.use('/pdf', express.static(path.join(__dirname, 'pdf')));
app.use('/images',express.static(path.join(__dirname, 'images')));
//app.use('/pdf',express.static('pdf'));
// Import routes
const roadmapRoutes = require('./api/routes/roadmapRoutes');
const videoRoutes = require('./api/routes/videoRoutes');
const questionRoutes = require('./api/routes/questionRoutes');

// Use routes
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/videos/nodejs', videoRoutes);

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
