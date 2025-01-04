require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
  }
};

connectDB();
module.exports = mongoose;
