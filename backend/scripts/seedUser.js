// backend/scripts/seedUser.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User"); // ✅ Adjust the path to model

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const hashedPassword = await bcrypt.hash("admin123", 10); // 👈 change if needed

   
    const user = new User({
        name: "Owner Admin",
        email: "owner@example.com", // ✅ MATCH this with your login form
        password: hashedPassword,
        role: "owner",
    });

    await user.save();
    console.log("✅ Owner user created successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding user:", err);
  }
}

seed();
