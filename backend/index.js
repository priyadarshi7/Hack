require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const { dbConnect } = require("./dbConnect");
const User = require("./models/user");
const cors = require("cors");
const { createTokenForUser } = require("./service/auth");

const app = express();

// Connect to MongoDB
dbConnect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: true, message: "Username is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ error: true, message: "Password is required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: true,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    let token = createTokenForUser(newUser);
    res.cookie("token", token);

    res.status(201).json({
      error: false,
      user: newUser,
      message: "Registration successful",
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: true, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: true, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: true, message: "Invalid credentials" });
    }

    // Authentication successful
    let token = createTokenForUser(user);
    res.cookie("token", token);

    res.status(200).json({ error: false, message: "Login successful", user });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
