const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Vesit!');
});

// GET teacher info via URL parameters
app.get('/teacher/:id/:name/:subject', (req, res) => {
  res.json({
    teacherId: req.params.id,
    name: req.params.name,
    subject: req.params.subject
  });
});

// GET student info via URL parameters
app.get('/student/:id/:name/:course', (req, res) => {
  res.json({
    stud_Id: req.params.id,
    name: req.params.name,
    course: req.params.course
  });
});

// POST teacher signup
app.post('/teachersignup', (req, res) => {
  const userData = req.body;
  res.json({
    message: 'Teacher data received',
    data: userData
  });
});

// POST student signup
app.post('/studentsignup', (req, res) => {
  const userData = req.body;
  res.json({
    message: 'Student data received',
    data: userData
  });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
