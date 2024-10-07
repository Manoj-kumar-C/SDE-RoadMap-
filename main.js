const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Add other routes and middleware as needed

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; // Export the app for Vercel
