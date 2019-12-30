const fs = require("fs");
const mongoose = require("mongoose");
const color = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./src/config/config.env" });

// Load models
const Sentence = require("./src/models/Sentence");
const Vote = require("./src/models/Vote");
const User = require("./src/models/User");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const sentences = JSON.parse(
  fs.readFileSync(`${__dirname}/src/data/sentences.json`, "utf-8")
);

const votes = JSON.parse(
  fs.readFileSync(`${__dirname}/src/data/votes.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/src/data/users.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Sentence.create(sentences);
    await Vote.create(votes);
    await User.create(users);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Sentence.deleteMany();
    await Vote.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
