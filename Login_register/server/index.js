const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const OwnerModel = require("./models/Owner");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/transportdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Register Route
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const existingEmail = await OwnerModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Optional: Check if name is already taken
        const existingName = await OwnerModel.findOne({ name });
        if (existingName) {
            return res.status(400).json({ message: "Name is already taken" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new owner
        await OwnerModel.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({ message: "Registration successful" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await OwnerModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "No user found" });
        }

        // Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        return res.status(200).json({ message: "Success" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Start the server
app.listen(3001, () => {
    console.log("server is running on http://localhost:3001");
});
