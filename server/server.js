const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serving static files

// Routes
app.use('/api/students', studentRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/student-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Starting the server
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
