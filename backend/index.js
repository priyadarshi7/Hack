require("dotenv").config();
const bcrypt = require("bcrypt");

const express = require("express");
const {dbConnect} = require("./dbConnect")
const mongoose = require("mongoose");
const User = require("./models/user");
const userModel = require("./models/user");
const cors = require("cors");
const app = express();

dbConnect(process.env.MONGODB_URL)
.then(()=>console.log("MongoDB Connected"));

app.use(express.json());
app.use(
    cors({
        origin:"*",
    })
);


app.post("/signup",async (req,res)=>{
    const {username,email,password} = req.body;

    if(!username){
        return res.status(400).json({error:true, message:"Fullname is required"});
    };

    if(!email){
        return res.status(400).json({error:true, message:"Email is required"});
    }

    if(!password){
        return res.status(400).json({error:true, message:"Password is required"});
    }

    const isUser = await userModel.findOne({email:email});
    if(isUser){
        return res.json({
            error:true,
            message:"user already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
        username,
        email,
        password:hashedPassword,
    })

    await user.save();

    return res.json({
        error: false,
        user,
        message:"Registration Successful",
    })

})


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: true, message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: true, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: true, message: "Invalid credentials" });
        }

        // Authentication successful
        res.status(200).json({ error: false, message: "Login successful", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});
    
const PORT = 8000;
app.listen(PORT,()=>console.log("Server has started"));