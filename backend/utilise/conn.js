const mongoose = require('mongoose');

const conn = async () => {
  try {
    await mongoose.connect("mongodb+srv://xtylishab000:a3pwYj66637J9wNY@cluster0.qsgtw7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = conn;
