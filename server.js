const colors = require("colors");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");
const express = require("express");

// Load env vars
dotenv.config({ path: "./src/config/config.env" });

// Connect to database
connectDB();

// Route files
const sentences = require("./src/routes/sentences");
const users = require("./src/routes/users");
const votes = require("./src/routes/votes");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

// Trust proxy
app.set("trust proxy", true);

// Body parser
app.use(express.json());

// Mount routers
app.use("/api/v1/sentences", sentences);
app.use("/api/v1/users", users);
app.use("/api/v1/votes", votes);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
