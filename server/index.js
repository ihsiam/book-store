// dependencies 
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

// .env import
require("dotenv").config();

// Router import
const router = require("./routes/route");

// Express init
const app = express();

// port define
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

// Database connection with mongoose
mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('Connection successful'))
    .catch((err) => console.error('MongoDB connection error:', err));

// All router implement
app.use(router);

// 404 page handle
app.use((req, res, next) => {
     res.send("Page not found");
})

// Server error handle
app.use((err, req, res, next) => {
     res.send(err);
     console.log(err);
})

// run server
app.listen(port, () => {
     console.log("Server is running");
});