const express = require("express");
const dotenv = require("dotenv");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

dotenv.config();

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, "../uploads"); // Directory to store files
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        cb(null, uniqueSuffix); // Save file with a unique name
    }
});

// Initialize Multer
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Check file type
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extName) {
            return cb(null, true);
        }
        cb(new Error("Only JPEG, JPG, and PNG images are allowed"));
    }
});

// Signup Controller
const signup = async (req, res) => {
    try {
        const { firstName, lastName, userBio, userEmail, userMobile, userName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(401).json({ error: "User already exists with this email" });
        }

        // Check if file is provided
        if (!req.file) {
            return res.status(400).json({ error: "No Profile Image Provided" });
        }

        // Encrypt password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(req.body.userPassword, salt);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: encryptedPassword,
            profileImage: `/uploads/${req.file.filename}` // Save relative file path in the database
        });

        await newUser.save();

        res.status(200).json({
            status: "Ok",
            user: newUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const user = await User.findOne({ userEmail });

        if (user) {
            const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
            if (passwordMatch) {
                return res.json(user);
            } else {
                return res.status(401).json({ status: "Error", getUser: false, message: "Invalid credentials" });
            }
        } else {
            return res.status(404).json({ status: "Error", getUser: false, message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signup, login, upload };
