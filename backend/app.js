// server.js
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const conn = require('./utilise/conn');
const authRoutes = require('./routes/auth');
const blogRoutes = require("./routes/blog");

const JWT_SECRET = process.env.JWT_SECRET;


// App config
const app = express();


//  Connect to DB at startup
conn();
const allowedOrigins = ['https://blogvista-frontend.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());


//  route 
app.use('/api', authRoutes);
app.use("/api", blogRoutes);

const PORT = 5000;
// Start server
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});









