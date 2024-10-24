const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./server/routes/blogRoutes');
const userRoutes = require('./server/routes/userRoutes');
const connectDB = require('./server/config/db');
require('dotenv').config();
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // If you want to support credentials (cookies, etc.)
  }));


  app.options('*', cors()); // Handle preflight requests for all routes


connectDB();

app.use(express.json());

app.use("/api/blogs", blogRoutes);
app.use("/api/users",userRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});